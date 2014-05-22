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
        'directives/Gallery',
        'directives/GalleryPhotoItem',
        'directives/GalleryClusterItem',
        './PhotoGalleryController',
        'data/AlbumClusterListData',
        'data/AlbumPhotosData'
    ],
        function (GalleryRx, GalleryDir, GalleryPhotoItemDir, GalleryClusterItemDir, PhotoGalleryCtrl, AlbumClusterListData, AlbumPhotosData) {
            var moduleName = "Nyx.PhotoGallery";

            angular
                .module(moduleName, [])

                .directive('nxGallery', GalleryDir)
                .directive('nxPhotoItem', GalleryPhotoItemDir)
                .directive('nxClusterItem', GalleryClusterItemDir)

                .factory('galleryRx', GalleryRx)

                .factory('albumClusterList', AlbumClusterListData)
                .factory('albumPhotosData', AlbumPhotosData)

                .controller('PhotoGallery.PhotoGalleryCtrl', PhotoGalleryCtrl);

            return moduleName;
        });

}(define, angular));