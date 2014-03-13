/**
 * NyxWebApp - Kooboodle Online Web
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define, angular) {
    'use strict';

    define([
        'nyx.auth',
        'controllers/main',
        'controllers/about',
        'controllers/contact'

    ], function (AuthenticateModule, MainCtrl, AboutCtrl, ContactCtrl) {

        console.log('[app]: configuring app');

        var app = angular.module('nyxWebApp', [
            'ngResource',
            'ngRoute',
            'Nyx.Auth'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl'
                })
                .when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'AboutCtrl'
                })
                .when('/contact', {
                    templateUrl: 'views/contact.html',
                    controller: 'ContactCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });

        console.log('[app]: plugging in controllers');

        // plugin controllers:
        MainCtrl(app), AboutCtrl(app), ContactCtrl(app);

        return app;
    });

} (define, angular));