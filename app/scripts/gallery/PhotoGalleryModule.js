/**
 * Photo Gallery module
 *
 * @namespace   NyxPhotoGallery
 * @author      IlyaVF
 * @date        April 7, 2014
 */

(function (define, angular) {
    'use strict';

    define([
        './GalleryReactive',
        '../directives/Gallery',
        '../directives/GalleryPhotoItem',
        '../directives/GalleryClusterItem',
        './PhotoGalleryController',
        'data/AlbumClusterListData'
    ],
        function (GalleryRx, Gallery, GalleryPhotoItem, GalleryClusterItem, PhotoGalleryCtrl, AlbumClusterListData) {
            var moduleName = "Nyx.PhotoGallery";

            angular
                .module(moduleName, [])

                .directive('gallery', Gallery)
                .directive('photoItem', GalleryPhotoItem)
                .directive('clusterItem', GalleryClusterItem)

                .factory('galleryRx', GalleryRx)

                .factory('albumClusterList', AlbumClusterListData)

                .controller('PhotoGallery.PhotoGalleryCtrl', PhotoGalleryCtrl);

            return moduleName;
        });

}(define, angular));