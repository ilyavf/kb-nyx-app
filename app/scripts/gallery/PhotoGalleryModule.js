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
        './PhotoGalleryController',
        'directives/Gallery',
        'directives/GalleryPhotoItem',
        'directives/GalleryClusterItem',
        'directives/GalleryTradeItem',
        'directives/GalleryTradeUserItem',
        'data/AlbumClusterListData',
        'data/AlbumPhotosData'
    ],
        function (
            GalleryRx, PhotoGalleryCtrl,
            GalleryDir, GalleryPhotoItemDir, GalleryClusterItemDir, GalleryTradeItemDir, GalleryTradeUserItemDir,
            AlbumClusterListData, AlbumPhotosData
        ) {
            var moduleName = "Nyx.PhotoGallery";

            angular
                .module(moduleName, [])

                .directive('nxGallery', GalleryDir)
                .directive('nxPhotoItem', GalleryPhotoItemDir)
                .directive('nxClusterItem', GalleryClusterItemDir)
                .directive('nxTradeItem', GalleryTradeItemDir)
                .directive('nxTradeUserItem', GalleryTradeUserItemDir)

                .factory('galleryRx', GalleryRx)

                .factory('albumClusterList', AlbumClusterListData)
                .factory('albumPhotosData', AlbumPhotosData)

                .controller('PhotoGallery.PhotoGalleryCtrl', PhotoGalleryCtrl);

            return moduleName;
        });

}(define, angular));