/**
 * NyxWebApp - Kooboodle Online Web
 *
 * @namespace nyxWebApp
 * @object
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define, angular) {
    'use strict';

    define([
        //'nyx.auth',
        //'core/authentication/AuthModule',

        'auth/AuthModule',
        'home/HomePageModule',
        'controllers/main',
        'controllers/userhome'

    ], function (AuthModule, HomePageModule, MainCtrl, UserHomeCtrl) {

        console.log('[app]: configuring app');

        var app = angular.module('nyxWebApp', [
            'ngResource',
            'ngRoute',
            'Nyx.Auth',
            'Nyx.HomePage'
        ])
        .config(function ($routeProvider) {
            console.log( "[nyxWebApp.RouteManager] Configuring $routeProvider...");
            $routeProvider
                .when('/auth', {
                    templateUrl: 'views/authorized/user_home.html',
                    controller: 'UserHomeCtrl',
                    resolve: {
                        isUserAuthenticated: function (currentUser) {
                            return currentUser.isAuthenticated();
                        }
                    }
                })
                .otherwise({
                    redirectTo: '/'
                });
        })
        .controller('MainCtrl', MainCtrl)
        .controller('UserHomeCtrl', UserHomeCtrl);

        return app;
    });

} (define, angular));