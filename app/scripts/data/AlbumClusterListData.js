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

    define(['config', 'utils/nx-utils'], function (config, utils) {
        var addProp = utils.addProp,
            _ = utils._,
            ClusterListData;

        ClusterListData = function ($location, $q, $http, ListData) {
            var proto = $location.protocol(),
                host = $location.host(),
                port = config.apiPort,
                prefix = proto + '://' + host + ':' + port,
                apiUrl = prefix + '/api/clusters',
                zeus = proto + '://' + config.zeusServer,
                apiUrlUpdate = zeus + '/album/update/{id}',
                //apiUrlUpdate = prefix + '/api/album/update/{id}',
                sync;


            sync = function (cluster) {
                var url = apiUrlUpdate.replace('{id}', cluster.id);
                console.log('[sync]: cluster item ' + cluster.title + ', id = ' + cluster.id, cluster);
                $http({
                    method: 'POST',
                    url: url + '?name=' +  cluster.title,
                    //data: {name: cluster.title},
                    withCredentials: true
                })
                .success(function(data, status, headers, config) {
                    console.log('[sync]: SUCCESS! ' + data, data);
                    cluster.syncLocal(cluster, 'title');
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