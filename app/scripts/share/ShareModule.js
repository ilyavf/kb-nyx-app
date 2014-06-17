/**
 * Share module
 *
 * @namespace   NyxShare
 * @author      IlyaVF
 * @date        June 3, 2014
 */

(function (define, angular) {
    'use strict';

    define([
        './ModalShare',
        'data/SharePhotosData'
    ],
        function (ModalShare, SharePhotosData) {
            var moduleName = "Nyx.Share";

            angular
                .module(moduleName, [])

                .factory('modalShare', ModalShare)
                .factory('sharePhotosData', SharePhotosData)

                .run(function ($rootScope, modalShare) {
                    $rootScope.$on('share:photos', function (e, ids) {
                        modalShare.open(ids);
                    })
                });

            return moduleName;
        });

}(define, angular));