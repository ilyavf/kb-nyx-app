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
        '../directives/GalleryItemSimple'
    ],
        function (Ctrl, GalleryItemSimple) {
            var moduleName = "Nyx.PhotoGallery";

            angular
                .module(moduleName, [])
                .directive('galleryItemSimple', GalleryItemSimple)
                .controller('PhotoGallery.Ctrl', Ctrl);

            return moduleName;
        });

}(define, angular));