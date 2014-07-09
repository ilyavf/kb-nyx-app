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

    define(['utils/nx-utils'], function (utils) {

        var _ = utils._;

        var ListData = function ($q, $http, $log, $window, $rootScope) {

            return function (apiUrl, localStorageItemName, options) {

                var pagesDeferred = [],
                    pageSize = 30,
                    totalPages = $q.defer(),
                    _pageNumber = 1,
                    CONFIG_LOCALSTORAGE_ITEMNAME = 'LISTDATA-' + localStorageItemName;

                //$rootScope.$on('user:logout', cleanupLocalData);

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
                        if (!data.error) {
                            $window.localStorage.setItem(CONFIG_LOCALSTORAGE_ITEMNAME + '-' + pageNumber, JSON.stringify(data.result));
                            options && options.preprocess && options.preprocess(data.result);
                            pagesDeferred[pageNumber].resolve(
                                dataToItems(getLocalPage(pageNumber), data.result)
                            );
                            totalPages.resolve(data.result.totalPages);
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

                function cleanupLocalData () {
                    //deferred = null;
                    //$window.localStorage.removeItem(CONFIG_LOCALSTORAGE_ITEMNAME);
                }

                function checkLocalData (pageNumber) {
                    if (pagesDeferred[pageNumber]) {
                        return true;
                    }

                    var data = JSON.parse($window.localStorage.getItem(CONFIG_LOCALSTORAGE_ITEMNAME + '-' + pageNumber));

                    if (data) {
                        pagesDeferred[pageNumber] = $q.defer();
                        options && options.preprocess && options.preprocess(data);
                        pagesDeferred[pageNumber].resolve(
                            dataToItems(getLocalPage(pageNumber), data)
                        );
                        totalPages.resolve(data.totalPages);
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
                        _.get('items')

                    )(data);
                    $window.test1 = data;
                    return data;
                };

                //function getItemByDashedTitle1 (dashedTitle) {
                //    return getPage(0).then(function (clustersPage) {
                //        return clustersPage.items.reduce(function (prev, cur) {
                //            return dashedTitle == cur.dashedTitle ? cur : prev
                //        });
                //    });
                //}

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