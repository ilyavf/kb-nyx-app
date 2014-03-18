define([

], function () { return function (app) {
    'use strict';

    app.controller('HomepageMainCtrl', function ($scope, $rootScope, $location, currentUser) {

        if (currentUser.isLoggedIn()) {
            $location.path('/auth');
            return;
        }

        console.log('[HomepageMainCtrl] initializing');
    });

}});