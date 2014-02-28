'use strict';

angular.module('nyxWebApp')
    .controller('MainCtrl', function ($scope, ModalSignIn) {
        $scope.openSignInModal = function () {
            ModalSignIn.login();
        };
    });
