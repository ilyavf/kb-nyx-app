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
        '../directives/GalleryClusterItem'
    ],
        function (GalleryRx, Gallery, GalleryPhotoItem, GalleryClusterItem) {
            var moduleName = "Nyx.PhotoGallery";

            angular
                .module(moduleName, [])

                .directive('gallery', Gallery)
                .directive('photoItem', GalleryPhotoItem)
                .directive('clusterItem', GalleryClusterItem)

                .factory('galleryRx', GalleryRx);

            return moduleName;
        });

}(define, angular));