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
        './PhotoGalleryCtrl',

        'directives/Gallery',
        'directives/GalleryPhotoDir',
        'directives/GalleryClusterDir',
        'directives/GalleryTradeDir',
        'directives/GalleryTradeeDir',
        'directives/ThumbsPreviewDir',
        'directives/ThumbListDir',
        'directives/GalleryFriendDir',

        'data/AlbumClusterListData',
        'data/AlbumPhotosData',
        'data/TradeListData',
        'data/TradeClusterData',
        'data/CalendarClusterListData',
        'data/CalendarYearsData',
        'data/CalendarMonthPhotosData'
    ],
        function (
            GalleryRx, PhotoGalleryCtrl,

            GalleryDir, GalleryPhotoDir, GalleryClusterDir, GalleryTradeDir,
            GalleryTradeeDir, ThumbsPreviewDir, ThumbListDir, FriendDir,

            AlbumClusterListData, AlbumPhotosData, TradeListData, TradeClusterData,
            CalendarClusterListData, CalendarYearsData, CalendarMonthPhotosData
        ) {
            var moduleName = "Nyx.PhotoGallery";

            angular
                .module(moduleName, [])

                .directive('nxGallery', GalleryDir)
                .directive('nxPhoto', GalleryPhotoDir)
                .directive('nxCluster', GalleryClusterDir)
                .directive('nxTrade', GalleryTradeDir)
                .directive('nxTradee', GalleryTradeeDir)
                .directive('nxThumbsPreview', ThumbsPreviewDir)
                .directive('nxThumblist', ThumbListDir)
                .directive('nxFriend', FriendDir)

                .factory('galleryRx', GalleryRx)


                .factory('albumClusterList', AlbumClusterListData)
                .factory('albumPhotosData', AlbumPhotosData)
                .factory('tradeListData', TradeListData)
                .factory('tradeClusterData', TradeClusterData)
                .factory('calendarClusterListData', CalendarClusterListData)
                .factory('calendarYearsData', CalendarYearsData)
                .factory('calendarMonthPhotosData', CalendarMonthPhotosData)

                .controller('PhotoGallery.PhotoGalleryCtrl', PhotoGalleryCtrl);

            return moduleName;
        });

}(define, angular));