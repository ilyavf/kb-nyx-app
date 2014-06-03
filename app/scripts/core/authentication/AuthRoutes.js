/**
 * Authentication Routing
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define) {
    'use strict';

    define([
        //'utils/Logger'
    ],
    function () {

        var RouteManager = function ($routeProvider)
        {
            console.log( "[Auth.RouteManager] Configuring $routeProvider...");

            $routeProvider
                .when( '/login', {
                    templateUrl : "views/homepage/home.html",
                    controller  : "LoginController"
                })
                .when( '/logout', {
                    templateUrl : "views/homepage/home.html",
                    controller  : "LoginController"
                })
                .when( '/signup', {
                    templateUrl : "views/homepage/home.html",
                    controller  : "LoginController"
                });

        };

        //$log = $log.getInstance( "RouteManager" );

        return RouteManager;
    });

}(define));