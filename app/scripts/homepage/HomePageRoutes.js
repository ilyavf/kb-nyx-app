/**
 * HomePage Routing. Serves routes /home, /about, /contact
 *
 * @memberof    NyxHomePage
 * @member      RouteManager
 *
 * @author      IlyaVF
 * @date        March 19, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

            var HomePageRouteManager = function ($routeProvider) {

                console.log( "[HomePage.RouteManager] Configuring $routeProvider...");

                $routeProvider
                    .when('/', {
                        templateUrl: 'views/homepage/home.html',
                        controller: 'HomePage.HomeCtrl'
                    })
                    .when('/home', {
                        templateUrl: 'views/homepage/home.html',
                        controller: 'HomePage.HomeCtrl'
                    })
                    .when('/about', {
                        templateUrl: 'views/homepage/about.html',
                        controller: 'HomePage.AboutCtrl'
                    })
                    .when('/contact', {
                        templateUrl: 'views/homepage/contact.html',
                        controller: 'HomePage.ContactCtrl'
                    });
            };

            return HomePageRouteManager;
        });

}(define));