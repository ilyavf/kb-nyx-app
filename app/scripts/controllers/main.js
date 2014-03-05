define([
    'services/modalsignin'

], function (modalsignin) { return function (app) {
    'use strict';

    modalsignin(app);

    app.controller('MainCtrl', function ($scope, ModalSignIn) {
        $scope.openSignInModal = function () {
            ModalSignIn.login();
        };
    });

}});