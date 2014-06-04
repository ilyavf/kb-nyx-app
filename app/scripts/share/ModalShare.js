/**
 * Photo share modal dialog
 *
 * @memberOf    NyxShare
 * @member      ModalShare
 * @property    {function} open  - Opens a modal for sharing photos
 *
 * @author      IlyaVF
 * @date        June 4, 2014
 */

(function (define) {
    'use strict';

    define([
    ],
        function () {
            var ModalShare = function ($modal, $log) {

                var ids = [];

                var modalShareCtrl = function ($scope, $modalInstance) {
                    $scope.ids = ids;
                    console.log('modal share: ' + ids.length);
                    $scope.close = function () {
                        $modalInstance.close();
                    };
                };

                function open (_ids) {
                    ids = _ids;
                    $modal.open({
                        templateUrl: 'views/modals/modal_share.html',
                        controller: modalShareCtrl
                    });
                }

                // Public API here
                return {
                    open: open
                };
            };

            return ModalShare;
        });
}(define));