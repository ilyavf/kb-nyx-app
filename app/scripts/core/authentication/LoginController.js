/**
 * Auth. Login controller
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        console.log('[Auth.LoginController] loaded');

        var LoginController = function ($scope, currentUser) {
            console.log('[Auth.LoginController] init');
            currentUser.get().then(function (user) {
                $scope.name = user.name;
            });
        };

        return LoginController;
    });

}(define));