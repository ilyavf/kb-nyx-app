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
        './PhotoGalleryController'
    ],
        function (Ctrl) {
            var moduleName = "Nyx.PhotoGallery";

            angular
                .module(moduleName, [])
                .controller("PhotoGallery.Ctrl", Ctrl);

            return moduleName;
        });

}(define, angular));