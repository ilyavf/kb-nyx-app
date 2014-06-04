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
        './ModalShare'
    ],
        function (ModalShare) {
            var moduleName = "Nyx.Share";

            angular
                .module(moduleName, [])

                .factory('modalShare', ModalShare)

                .run(function ($rootScope, modalShare) {
                    $rootScope.$on('share:photos', function (e, ids) {
                        modalShare.open(ids);
                    })
                });

            return moduleName;
        });

}(define, angular));