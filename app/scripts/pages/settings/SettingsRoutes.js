/**
 * Nyx.SettingsPage routing
 * This module serves Settings page: /auth/settings.
 *
 * @memberof    NyxSettingsPage
 * @member      RouteManager
 *
 * @author      IlyaVF
 * @date        March 27, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

            var SettingsRouteManager = function ($routeProvider) {

                console.log( "[GivengetRouteManager] Configuring $routeProvider...");

                $routeProvider
                    .when('/auth/settings', {
                        templateUrl: 'views/settings/general.html',
                        controller: 'SettingsPage.SettingsCtrl',
                        resolve: {
                            isUserAuthenticated: function (currentUser) {
                                return currentUser.isAuthenticated();
                            }
                        }
                    });
            };

            return SettingsRouteManager;
        });

}(define));