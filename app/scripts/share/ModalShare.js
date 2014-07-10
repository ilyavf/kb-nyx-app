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
            var ModalShare = function ($modal) {

                var ids = [];

                var modalShareCtrl = function ($scope, $modalInstance, sharePhotosData) {
                    $scope.ids = ids;
                    $scope.contacts = {
                        inputStr: '',
                        items: []
                    };
                    console.log('modal share: ' + ids.length);
                    $scope.close = function () {
                        $modalInstance.close();
                    };
                    $scope.send = function () {
                        console.log('[modal share.send] ' + $scope.contacts.inputStr + ', ' + $scope.ids.length);
                        sharePhotosData.send($scope.ids, $scope.contacts.inputStr.split(' '))
                            .then(function (data) {
                                console.log('[modalShareCtrl] success', data);
                                $modalInstance.close();
                            }, function (data) {
                                console.log('[modalShareCtrl] error', data);
                            });
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