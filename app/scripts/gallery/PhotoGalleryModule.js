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
        'directives/GalleryPhotoDir',
        'directives/GalleryClusterDir',
        'directives/GalleryTradeDir',
        'directives/GalleryTradeeDir',

        'data/AlbumClusterListData',
        'data/AlbumPhotosData',
        'data/TradeListData'
    ],
        function (
            GalleryRx, PhotoGalleryCtrl,
            GalleryDir, GalleryPhotoDir, GalleryClusterDir, GalleryTradeDir, GalleryTradeeDir,
            AlbumClusterListData, AlbumPhotosData, TradeListData
        ) {
            var moduleName = "Nyx.PhotoGallery";

            angular
                .module(moduleName, [])

                .directive('nxGallery', GalleryDir)
                .directive('nxPhoto', GalleryPhotoDir)
                .directive('nxCluster', GalleryClusterDir)
                .directive('nxTrade', GalleryTradeDir)
                .directive('nxTradee', GalleryTradeeDir)

                .factory('galleryRx', GalleryRx)

                .factory('albumClusterList', AlbumClusterListData)
                .factory('albumPhotosData', AlbumPhotosData)
                .factory('tradeListData', TradeListData)

                .controller('PhotoGallery.PhotoGalleryCtrl', PhotoGalleryCtrl);

            return moduleName;
        });

}(define, angular));