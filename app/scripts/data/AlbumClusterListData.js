/**
 * ClusterListData resource.
 *
 * @memberOf    DataSource
 * @member      ClusterListData
 *
 * @author      IlyaVF
 * @date        April 29, 2014
 * @summary     List of clusters with photos
 * @property    {function} get  - Returns Cluster photos promise
 */

(function (define) {
    'use strict';

    define([], function () {

        var ClusterListData = function ($q, $http, $log, $window, $location, $rootScope) {
            var deferred,
                proto = $location.protocol(),
                host = $location.host(),
                port = '1337',
                prefix = proto + '://' + host + ':' + port,
                apiUrl = prefix + '/api/cluster/list',
                pageSize = 12,
                _pageNumber = 1;

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
                        $window.localStorage.setItem('ClusterListData', JSON.stringify(data.result));
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

            var pagesDeffered = [];
            function next (pageNumber) {
                pageNumber = typeof pageNumber !== 'undefined' ? pageNumber : _pageNumber++;

                console.log('[ClusterListData.next] ' +  pageNumber);

                if (pagesDeffered[pageNumber]) {
                    return pagesDeffered[pageNumber].promise;
                }
                console.log('- creating a deferred for ' +  pageNumber);
                pagesDeffered[pageNumber] = $q.defer();

                getClusterList().then(function (items) {
                    var newItems = items.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize);
                    console.log('- resolving items for ' +  pageNumber + ' ' + newItems.length, newItems);
                    pagesDeffered[pageNumber].resolve(newItems);
                });

                return pagesDeffered[pageNumber].promise;
            }

            function cleanupLocalData () {
                deferred = null;
                $window.localStorage.removeItem('ClusterListData');
            };

            function checkLocalData () {
                var data = JSON.parse($window.localStorage.getItem('ClusterListData'));

                if (data) {
                    deferred = $q.defer();
                    deferred.resolve(data);
                }

                $rootScope.$on('user:logout', cleanupLocalData);
            };

            // Public API here:
            return {
                get: function () {
                    return next(0);
                },
                next: next
            };
        };

        return ClusterListData;

    });
}(define));