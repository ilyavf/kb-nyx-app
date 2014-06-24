/**
 * TradeClusterData resource.
 *
 * @memberOf    DataSource
 * @member      TradeClusterData
 *
 * @author      IlyaVF
 * @date        June 24, 2014
 * @summary     Photos for a given album cluster being traded with a given user
 * @property    {function} get  - Returns a promise of photos for the given cluster marking photos traded to the given user
 */

(function (define) {
    'use strict';

    define([], function () {

        var TradeClusterData = function ($location, ListData) {
            var proto = $location.protocol(),
                host = $location.host(),
                port = '1337',
                prefix = proto + '://' + host + ':' + port,
                apiUrl = prefix + '/api/album/{albumId}/photos',
                albumsById = {};

            return function (albumId) {
                return albumsById[albumId] || (albumsById[albumId] = ListData(apiUrl.replace('{albumId}', albumId), 'AlbumPhotos-' + albumId), albumsById[albumId]);
            }
        };

        return TradeClusterData;

    });
}(define));