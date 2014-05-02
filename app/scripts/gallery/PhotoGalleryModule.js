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
        './PhotoGalleryController',
        './GalleryReactive',
        '../directives/Gallery',
        '../directives/GalleryPhotoItem',
        '../directives/GalleryClusterItem',
        '../data/ClusterListData'
    ],
        function (Ctrl, GalleryRx, Gallery, GalleryPhotoItem, GalleryClusterItem, ClusterListData) {
            var moduleName = "Nyx.PhotoGallery";

            angular
                .module(moduleName, [])

                .directive('gallery', Gallery)
                .directive('photoItem', GalleryPhotoItem)
                .directive('clusterItem', GalleryClusterItem)

                .factory('clusterList', ClusterListData)
                .factory('galleryRx', GalleryRx)

                .controller('PhotoGallery.Ctrl', Ctrl);

            return moduleName;
        });

}(define, angular));