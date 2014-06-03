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

        var LoginController = function ($scope, $location, $rootScope) {
            var mode = $location.path() === '/signup' ? 'signup' : 'login';
            console.log('[Auth.LoginController] init ' + mode);
            $rootScope.$broadcast('signin', mode);
        };

        return LoginController;
    });

}(define));