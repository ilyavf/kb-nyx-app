/**
 * Authentication Module
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define, angular) {
    'use strict';

    define([
        'auth/AuthRoutes',
        'auth/CurrentUser',
        'auth/LoginController',
        'auth/SignupController'
    ],
    function (AuthRoutes, CurrentUser, LoginController, SignupController) {
        var moduleName = "Nyx.Authenticate";

        angular
            .module(moduleName, [ ])
            .config(AuthRoutes)
            .factory("currentUser", CurrentUser)
            .controller("LoginController", LoginController)
            .controller("SignupController", SignupController);

        return moduleName;
    });


}(define, angular));