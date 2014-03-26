/**
 * Authentication Module - angular module Nyx.Auth
 *
 * @namespace   NyxAuth
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define, angular) {
    'use strict';

    define([
        './AuthRoutes',
        './CurrentUser',
        './LoginController',
        './ModalSignIn'
    ],
    function (AuthRoutes, CurrentUser, LoginController, ModalSignIn) {
        var moduleName = "Nyx.Auth";

        angular
            .module(moduleName, ['ngRoute', 'ui.bootstrap'])
            .config(AuthRoutes)
            .factory("currentUser", CurrentUser)
            .factory("modalSignIn", ModalSignIn)
            .controller("LoginController", LoginController)

            // Handle global events:
            .run(function ($rootScope, modalSignIn, $log) {
                $rootScope.$on('signin', function (event, mode) {
                    mode = mode || 'login';
                    $log.debug('EVENT: [AuthModule.run]: event signin captured ' + mode);
                    if (mode === 'signup') {
                        modalSignIn.signup();
                    } else {
                        modalSignIn.login();
                    }
                });
            });


        return moduleName;
    });


}(define, angular));