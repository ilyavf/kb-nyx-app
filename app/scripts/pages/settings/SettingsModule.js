/**
 * Nyx.SettingsPage
 * This module serves Settings page: /auth/settings.
 *
 * @namespace   NyxSettingsPage
 * @author      IlyaVF
 * @date        March 27, 2014
 */

(function (define, angular) {
    'use strict';

    define([
        './SettingsRoutes',
        './SettingsController'
    ],
    function (Routes, Ctrl) {
        var moduleName = "Nyx.SettingsPage";

        angular
            .module(moduleName, ['ngRoute'])
            .config(Routes)
            .controller("SettingsPage.SettingsCtrl", Ctrl)

            // Handle global events:
            .run(function ($rootScope, $location) {
                $rootScope.$on('navMain:selected', function (event, menuCode, itemCode) {
                    if (menuCode === 'settings') {
                        $location.path('/auth/' + itemCode);
                    }
                });
            });

        return moduleName;
    });

}(define, angular));