/**
 * Nyx.GngPage routing
 * This module serves Give'N'Get pages: /auth/find-friends, /auth/notifications.
 *
 * @memberof    NyxGngPage
 * @member      RouteManager
 *
 * @author      IlyaVF
 * @date        March 27, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

            var GivengetRouteManager = function ($routeProvider) {

                console.log( "[GivengetRouteManager] Configuring $routeProvider...");

                $routeProvider
                    .when('/auth/find-friends', {
                        templateUrl: 'views/givenget/find_friends.html',
                        controller: 'GngPage.FindFriendsCtrl',
                        resolve: {
                            isUserAuthenticated: function (currentUser) {
                                return currentUser.isAuthenticated();
                            }
                        }
                    })
                    .when('/auth/notifications', {
                        templateUrl: 'views/givenget/notifications.html',
                        controller: 'GngPage.NotificationsCtrl',
                        resolve: {
                            isUserAuthenticated: function (currentUser) {
                                return currentUser.isAuthenticated();
                            }
                        }
                    })
            };

            return GivengetRouteManager;
        });

}(define));