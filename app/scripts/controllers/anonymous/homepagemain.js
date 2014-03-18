define([

], function () { return function (app) {
    'use strict';

    app.controller('HomepageMainCtrl', function ($scope, $rootScope) {
        console.log('[HomepageMainCtrl] initializing');
        $scope.openSignInModal = function () {
            //ModalSignIn.login();
            $rootScope.$broadcast('signin');
        };
    });

}});