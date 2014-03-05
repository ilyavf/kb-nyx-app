define([
    'controllers/main',
    'controllers/about',
    'controllers/contact'

], function (MainCtrl, AboutCtrl, ContactCtrl) {
    'use strict';

    console.log('[app]: configuring app');
    var appPromise = {
        callbacks: [],
        resolve: function (app) {
            console.log('[appPromise.resolve]: for ' + this.callbacks.length);
            for (var i in this.callbacks) {
                this.callbacks[i](app);
            };
        },
        then: function (fn) {
            this.callbacks.push(fn);
        }
    };

    var app = angular.module('nyxWebApp', [
        'ngResource',
        'ngRoute',
        'ui.bootstrap'
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
