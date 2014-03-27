/**
 * Nyx.MyPage routing
 * This module serves My Kooboodle pages: /auth/albums, /auth/calendar, /auth/shared.
 *
 * @memberof    NyxMyPage
 * @member      RouteManager
 *
 * @author      IlyaVF
 * @date        March 27, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

            var MykooboodleRouteManager = function ($routeProvider) {

                console.log( "[MykooboodleRouteManager] Configuring $routeProvider...");

                $routeProvider
                    .when('/auth/albums', {
                        templateUrl: 'views/mykooboodle/albums.html',
                        controller: 'MyPage.AlbumsCtrl',
                        resolve: {
                            isUserAuthenticated: function (currentUser) {
                                return currentUser.isAuthenticated();
                            }
                        }
                    })
                    .when('/auth/calendar', {
                        templateUrl: 'views/mykooboodle/calendar.html',
                        controller: 'MyPage.CalendarCtrl',
                        resolve: {
                            isUserAuthenticated: function (currentUser) {
                                return currentUser.isAuthenticated();
                            }
                        }
                    })
                    .when('/auth/shared', {
                        templateUrl: 'views/mykooboodle/shared.html',
                        controller: 'MyPage.SharedCtrl',
                        resolve: {
                            isUserAuthenticated: function (currentUser) {
                                return currentUser.isAuthenticated();
                            }
                        }
                    });
            };

            return MykooboodleRouteManager;
        });

}(define));