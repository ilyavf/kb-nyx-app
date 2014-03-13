/**
 * Authentication Routing
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define) {
    'use strict';

    define([
        'utils/Logger'
    ],
    function ($log) {

        var RouteManager = function ( $routeProvider )
        {
            $log.debug( "Configuring $routeProvider...");

            $routeProvider
                .when( '/login', {
                    templateUrl : "./core/authentication/views/login.tpl.html",
                    controller  : "LoginController"
                })
                .when( '/signup', {
                    templateUrl : "./core/authentication/views/signup.tpl.html",
                    controller  : "SignupController"
                });

        };

        $log = $log.getInstance( "RouteManager" );

        return ["$routeProvider", RouteManager ];
    });

}(define));