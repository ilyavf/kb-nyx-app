define([

], function () { return function (app) {
    'use strict';

    app.controller('MainCtrl', function ($scope, $rootScope) {
        $scope.openSignInModal = function () {
            //ModalSignIn.login();
            $rootScope.$broadcast('signin');
        };
    });

}});