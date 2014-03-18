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
                    templateUrl : "views/login.tpl.html",
                    controller  : "LoginController"
                })
                .when( '/signup', {
                    templateUrl : "views/signup.tpl.html",
                    controller  : "SignupController"
                });

        };

        //$log = $log.getInstance( "RouteManager" );

        return RouteManager;
    });

}(define));