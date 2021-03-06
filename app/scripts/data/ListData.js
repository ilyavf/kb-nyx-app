/**
 * ListData generic resource.
 *
 * @memberOf    DataSource
 * @member      ListData
 *
 * @author      IlyaVF
 * @date        May 12, 2014
 * @summary     Generic class to work with a list of items
 * @property    {function} get  - Returns items promise
 */

(function (define) {
    'use strict';

    define(['utils/nx-utils', 'config'], function (utils, cfg) {

        var _ = utils._;

        var ListData = function ($q, $http, $log, $window, $location, $rootScope) {

            var proto = $location.protocol(),
                host = $location.host(),
                port = cfg.apiPort,
                apiPrefix = proto + '://' + host + ':' + port;

            return function (apiUrl, localStorageItemName, options) {

                console.log('[ListData] ' + localStorageItemName + ', ' + apiUrl, options);

                if (!apiUrl || typeof apiUrl !== 'string') {
                    throw new Error('Api url is required for the ListData service.');
                    return;
                }

                $rootScope.$on('user:logout', cleanupLocalData);

                var pagesDeferred = [],
                    pageSize = options && options.pageSize || 30,
                    totalPages = $q.defer(),
                    _pageNumber = 1,
                    CONFIG_LOCALSTORAGE_ITEMNAME = 'LISTDATA-' + localStorageItemName;

                if (apiUrl[0] === '/') {
                    apiUrl = apiPrefix + apiUrl;
                }

                function getPage (pageNumber) {

                    if (checkLocalData(pageNumber) && pagesDeferred[pageNumber]) {
                        return pagesDeferred[pageNumber].promise;
                    }

                    pagesDeferred[pageNumber] = $q.defer();

                    console.log('[getPage] ' + pageNumber + ' has no local data. Fetching...');

                    $http({
                        method: 'GET',
                        url: apiUrl + '?page=' + (pageNumber + 1) + '&pageSize=' + pageSize,
                        withCredentials: true
                    })
                    .success(function(data, status, headers, config) {
                        $log.log('[ClusterListData.getPage]: received', arguments);

                        /*
                            Response structure is:
                            {
                                code: <200>,
                                error: <1 or 0>,
                                message: <string>,
                                result: <object or array>
                            }
                            Response for paged lists:
                            {
                                code: <200>,
                                error: <1 or 0>,
                                result: {
                                    currentPage: <number>,
                                    totalPages: <number>,
                                    totalItems: <number>,
                                    items: <array>
                                }
                            }

                            After we checked "error" property being false,
                            we store only "result" property of the response.

                            There are the hooks for response data result manipulation:
                            - mutate, which can just mutate data's "result" property (not expected to return a new object);
                            - preprocess, which can reformat data's "result" property completely returning a new object.
                            - postprocess, which is applied after getting from storage.
                        */

                        if (!data.error) {

                            var _result;

                            options && options.mutate && options.mutate(data.result);

                            _result = options && options.preprocess && options.preprocess(data.result) || data.result;

                            $window.localStorage.setItem(CONFIG_LOCALSTORAGE_ITEMNAME + '-' + pageNumber, JSON.stringify(_result));

                            options && options.postprocess && (_result = options.postprocess(_result));

                            pagesDeferred[pageNumber].resolve(
                                dataToItems(getLocalPage(pageNumber), _result)
                            );
                            _result.totalPages && totalPages.resolve(_result.totalPages) || totalPages.resolve(1);
                        } else {
                            console.log('Response is unsuccessful.', data);
                            pagesDeferred[pageNumber].reject({
                                error: 1,
                                message: data.message || 'Unknown error'
                            });
                        }
                    })
                    .error(function(data, status, headers, config) {
                        $log.error('[ClusterListData.getPage]: error', arguments);
                        pagesDeferred[pageNumber].reject({
                                error: 1,
                                data: data.result,
                                message: data.message || 'Error while trying to load cluster list'}
                        );
                    });

                    return pagesDeferred[pageNumber].promise;
                }

                function next (pageNumber) {
                    pageNumber = typeof pageNumber !== 'undefined' ? pageNumber : _pageNumber++;

                    if (pageNumber === 0) {
                        console.log('[.next]: ' + pageNumber + ' - initial page, do getPage(0) ' + pageNumber);
                        return getPage(pageNumber);
                    }

                    return totalPages.promise.then(function (totalPages) {
                        if (pageNumber + 1 > totalPages) {
                            console.log('- You reached page limit of  ' + totalPages);
                            _pageNumber = totalPages;
                            var deferred = $q.defer();
                            deferred.reject('You reached page limit of ' + totalPages);
                            return deferred.promise;
                        }
                        console.log('[.next] ' + pageNumber + ' - totalPages is  ' + totalPages);
                        return getPage(pageNumber);
                    });
                }

                function removeItem (key) {
                    localStorage.removeItem(key);
                }
                function cleanupLocalData () {
                    //deferred = null;
                    _.map(removeItem, _.filter(_.match(/^LISTDATA/), _.keys(localStorage)))
                }

                function checkLocalData (pageNumber) {
                    console.log('[checkLocalData] for ' + CONFIG_LOCALSTORAGE_ITEMNAME);
                    if (pagesDeferred[pageNumber]) {
                        return true;
                    }

                    var _result = JSON.parse($window.localStorage.getItem(CONFIG_LOCALSTORAGE_ITEMNAME + '-' + pageNumber));

                    if (_result) {
                        options && options.postprocess && (_result = options.postprocess(_result));
                        pagesDeferred[pageNumber] = $q.defer();
                        pagesDeferred[pageNumber].resolve(
                            dataToItems(getLocalPage(pageNumber), _result)
                        );
                        totalPages.resolve(_result.totalPages);
                    }

                    return !!pagesDeferred[pageNumber];
                }

                var syncClusterLocal = _.curry(function(localPage, setLocalPage, cluster, prop) {
                    var localItem = _.compose(_.find(_.where({id: cluster.id})), _.get('items'))(localPage);
                    console.log('[syncClusterLocal] ' + localItem[prop] + ' to ' + cluster[prop], cluster, localItem);
                    localItem[prop] = cluster[prop];
                    setLocalPage(localPage);
                });

                var getLocalPage = _.curry(function getLocalPage(localStorage, itemName, pageNumber) {
                    return JSON.parse(localStorage.getItem(itemName + '-' + pageNumber));
                })($window.localStorage, CONFIG_LOCALSTORAGE_ITEMNAME);

                var setLocalPage = _.curry(function getLocalPage(localStorage, itemName, dataPage) {
                    localStorage.setItem(itemName + '-' + (dataPage.currentPage - 1), JSON.stringify(dataPage));
                    return dataPage;
                })($window.localStorage, CONFIG_LOCALSTORAGE_ITEMNAME);

                var dataToItems = function (getLocalPage, data) {
                    _.compose(
                        _.map(utils.addProp(
                            'syncLocal',
                            syncClusterLocal(getLocalPage, setLocalPage)
                        )),
                        utils.maybeArr,
                        _.get('items')

                    )(data);
                    return data;
                };

                function getItemByDashedTitle (dashedTitle) {
                    var itemPromise = getPage(0)
                        .then(_.get('items'))
                        .then(_.find(_.where({dashedTitle: dashedTitle})));

                    return itemPromise;
                }

                // Public API here:
                return {
                    get: function () {
                        return next(0);
                    },
                    getItemByDashedTitle: getItemByDashedTitle,
                    next: next
                };

            }
        };

        return ListData;

    });
}(define));