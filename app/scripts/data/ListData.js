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

            return function (apiUrl, localStorageItemName) {

                var deferred,
                    pageSize = 12,
                    _pageNumber = 1,
                    pagesDeferred = [],
                    CONFIG_LOCALSTORAGE_ITEMNAME = 'LISTDATA-' + localStorageItemName;

                checkLocalData();

                var getClusterList = function () {
                    if (deferred) {
                        return deferred.promise;
                    }

                    deferred = $q.defer();

                    $http({
                        method: 'GET',
                        url: apiUrl,
                        withCredentials: true
                    })
                    .success(function(data, status, headers, config) {
                        $log.log('[ClusterListData.getClusterList]: received', arguments);
                        if (data.success) {
                            $window.localStorage.setItem(CONFIG_LOCALSTORAGE_ITEMNAME, JSON.stringify(data.result));
                            deferred.resolve(data.result);
                        } else {
                            deferred.reject({
                                    success: false,
                                    message: data.message || 'Unknown error'}
                            );
                        }
                    })
                    .error(function(data, status, headers, config) {
                        $log.error('[ClusterListData.getClusterList]: error', arguments);
                        deferred.reject({
                                success: false,
                                data: data.result,
                                message: data.message || 'Error while trying to load cluster list'}
                        );
                    });

                    return deferred.promise;
                };

                function next (pageNumber) {
                    pageNumber = typeof pageNumber !== 'undefined' ? pageNumber : _pageNumber++;

                    console.log('[ClusterListData.next] ' +  pageNumber);

                    if (pagesDeferred[pageNumber]) {
                        return pagesDeferred[pageNumber].promise;
                    }
                    console.log('- creating a deferred for ' +  pageNumber);
                    pagesDeferred[pageNumber] = $q.defer();

                    getClusterList().then(function (items) {
                        var newItems = items.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize);
                        console.log('- resolving items for ' +  pageNumber + ' ' + newItems.length, newItems);
                        pagesDeferred[pageNumber].resolve(newItems);
                    });

                    return pagesDeferred[pageNumber].promise;
                }

                function cleanupLocalData () {
                    deferred = null;
                    $window.localStorage.removeItem(CONFIG_LOCALSTORAGE_ITEMNAME);
                }

                function checkLocalData () {
                    var data = JSON.parse($window.localStorage.getItem(CONFIG_LOCALSTORAGE_ITEMNAME));

                    if (data) {
                        deferred = $q.defer();
                        deferred.resolve(data);
                    }

                    $rootScope.$on('user:logout', cleanupLocalData);
                }

                function getItemByDashedTitle (dashedTitle) {
                    return getClusterList().then(function (clusters) {
                        return clusters.reduce(function (prev, cur) {
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