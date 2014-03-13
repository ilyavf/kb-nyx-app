/**
 * Authentication Module
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define, angular) {
    'use strict';

    define([
        './AuthRoutes',
        './CurrentUser',
        './LoginController',
        //'./SignupController',
        './ModalSignIn'
    ],
    function (AuthRoutes, CurrentUser, LoginController, /*SignupController,*/ ModalSignIn) {
        var moduleName = "Nyx.Auth";

        angular
            .module(moduleName, ['ngRoute', 'ui.bootstrap'])
            .config(AuthRoutes)
            .factory("currentUser", CurrentUser)
            .factory("modalSignIn", ModalSignIn)
            .controller("LoginController", LoginController)
            //.controller("SignupController", SignupController)

            // Handle global events:
            .run(function ($rootScope, modalSignIn, $log) {
                $rootScope.$on('signin', function (event, args) {
                    $log.debug('EVENT: [AuthModule.run]: event signin captured');
                    modalSignIn.login();
                });
            });


        return moduleName;
    });


}(define, angular));