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
        '../directives/Gallery',
        '../directives/GalleryPhotoItem',
        '../directives/GalleryClusterItem'
    ],
        function (Ctrl, Gallery, GalleryPhotoItem, GalleryClusterItem) {
            var moduleName = "Nyx.PhotoGallery";

            angular
                .module(moduleName, [])

                .directive('gallery', Gallery)
                .directive('photoItem', GalleryPhotoItem)
                .directive('clusterItem', GalleryClusterItem)

                .controller('PhotoGallery.Ctrl', Ctrl);

            return moduleName;
        });

}(define, angular));