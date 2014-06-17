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

    define([], function () {

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
                        if (data.success) {
                            $window.localStorage.setItem(CONFIG_LOCALSTORAGE_ITEMNAME + '-' + pageNumber, JSON.stringify(data.result));
                            options && options.preprocess && options.preprocess(data.result);
                            pagesDeferred[pageNumber].resolve(data.result);
                            totalPages.resolve(data.result.totalPages);
                        } else {
                            pagesDeferred[pageNumber].reject({
                                success: false,
                                message: data.message || 'Unknown error'
                            });
                        }
                    })
                    .error(function(data, status, headers, config) {
                        $log.error('[ClusterListData.getPage]: error', arguments);
                        pagesDeferred[pageNumber].reject({
                                success: false,
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
                        pagesDeferred[pageNumber].resolve(data);
                        totalPages.resolve(data.totalPages);
                    }

                    return !!pagesDeferred[pageNumber];
                }

                //var syncClusterLocal = _.curry(function(localStorage, pageNumber, cluster) {
                //
                //});

                function getItemByDashedTitle (dashedTitle) {
                    return getPage(0).then(function (clustersPage) {
                        return clustersPage.items.reduce(function (prev, cur) {
                            return dashedTitle == cur.dashedTitle ? cur : prev
                        });
                    });
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