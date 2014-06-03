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

    var _ = ramda;

    define([], function () {
        var addProp, ClusterListData;

        addProp = _.curry(function (prop, value, obj) {
            obj[prop] = value;
            return obj;
        });

        ClusterListData = function ($location, $q, $http, ListData) {
            var proto = $location.protocol(),
                host = $location.host(),
                port = '1337',
                prefix = proto + '://' + host + ':' + port,
                apiUrl = prefix + '/api/clusters',
                zeus = proto + '://z.dev.kooboodle.com',
                apiUrlUpdate = zeus + '/album/update/{id}',
                sync;


            sync = function (cluster) {
                var url = apiUrlUpdate.replace('{id}', cluster.id);
                console.log('[sync]: cluster item ' + cluster.title + ', id = ' + cluster.id + ', url: ');
                $http({
                    method: 'POST',
                    url: url,
                    data: {name: cluster.title},
                    withCredentials: true
                })
                .success(function(data, status, headers, config) {
                   console.log('[sync]: SUCCESS! ' + data, data);
                })
                .error(function(data, status, headers, config) {
                        console.log('[sync]: ERROR ' + data, data);
                });
            };

            return ListData(apiUrl, 'AlbumClusters', {preprocess: _.compose(_.map(addProp('sync', sync)), _.get('items'))});
        };

        return ClusterListData;

    });
}(define));