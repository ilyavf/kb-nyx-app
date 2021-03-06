/**
 * AlbumPhotosData resource.
 *
 * @memberOf    DataSource
 * @member      AlbumPhotosData
 *
 * @author      IlyaVF
 * @date        April 29, 2014
 * @summary     Photos for a given album cluster
 * @property    {function} get  - Returns a promise of photos for a given album
 */

(function (define) {
    'use strict';

    define(['config'], function (config) {

        var AlbumPhotosData = function ($location, ListData) {
            var proto = $location.protocol(),
                host = $location.host(),
                port = config.apiPort,
                prefix = proto + '://' + host + ':' + port,
                apiUrl = prefix + '/api/album/{albumId}/photos',
                albumsById = {};

            return function (albumId, options) {
                return albumsById[albumId] || (albumsById[albumId] = ListData(apiUrl.replace('{albumId}', albumId), 'AlbumPhotos-' + albumId, options), albumsById[albumId]);
            }
        };

        return AlbumPhotosData;

    });
}(define));