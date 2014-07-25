/**
 * Lightbox module
 *
 * @namespace   NyxLightbox
 * @author      IlyaVF
 * @date        July 25, 2014
 */

(function (define, angular) {
    'use strict';

    define([
            './LightboxCtrl'
        ],
        function (LightboxCtrl) {
            var moduleName = "Nyx.Lightbox";

            angular
                .module(moduleName, [])

                .controller('LightboxCtrl', LightboxCtrl)

//                .run(function ($rootScope, modalShare) {
//                    $rootScope.$on('lightbox:show', function (e, cluster, current) {
//                        modalShare.open(cluster, current);
//                    });
//                });

            return moduleName;
        });

}(define, angular));