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
        'nyx.auth',
        'controllers/main',
        'controllers/anonymous/homepagemain',
        'controllers/anonymous/about',
        'controllers/anonymous/contact',
        'controllers/userhome'

    ], function (AuthenticateModule, MainCtrl, HomepageMainCtrl, AboutCtrl, ContactCtrl, UserHomeCtrl) {

        console.log('[app]: configuring app');

        var app = angular.module('nyxWebApp', [
            'ngResource',
            'ngRoute',
            'Nyx.Auth'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/anonymous/main.html',
                    controller: 'HomepageMainCtrl'
                })
                .when('/about', {
                    templateUrl: 'views/anonymous/about.html',
                    controller: 'AboutCtrl'
                })
                .when('/contact', {
                    templateUrl: 'views/anonymous/contact.html',
                    controller: 'ContactCtrl'
                })
                .when('/auth', {
                    templateUrl: 'views/authorized/user_home.html',
                    controller: 'UserHomeCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        })
        .controller('MainCtrl', MainCtrl)
        .controller('UserHomeCtrl', UserHomeCtrl);

        console.log('[app]: plugging in controllers');

        // plugin controllers:
        HomepageMainCtrl(app), AboutCtrl(app), ContactCtrl(app);

        return app;
    });

} (define, angular));