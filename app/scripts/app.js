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
        'pages/mykooboodle/MykooboodleModule',
        'pages/givenget/GivengetModule',
        'pages/settings/SettingsModule',
        'menu/authmain/MenuAuthMainModule',
        'gallery/PhotoGalleryModule',
        'controllers/main',
        'controllers/userhome',
        'data/ListData'

    ], function (AuthModule, HomePageModule, MyPageModule, GivengetModule, SettingsModule, MenuModule, PhotoGallery, MainCtrl, UserHomeCtrl, ListData) {

        console.log('[app]: configuring app');

        var app = angular.module('nyxWebApp', [
            'ngResource',
            'ngRoute',
            'Nyx.Auth',
            'Nyx.HomePage',
            'Nyx.MyPage',
            'Nyx.GngPage',
            'Nyx.SettingsPage',
            'Nyx.Menu.AuthMain',
            'Nyx.PhotoGallery'
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

        .factory('ListData', ListData)

        .controller('MainCtrl', MainCtrl)
        .controller('UserHomeCtrl', UserHomeCtrl);

        return app;
    });

} (define, angular));