/**
 * SettingsPage Settings controller
 *
 * @memberof    NyxSettingsPage
 * @member      Settings
 * @object
 * @property    {string} pageTitle - General Settings
 *
 * @author      IlyaVF
 * @date        March 27, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var SettingsCtrl = function ($scope, $rootScope, $timeout) {

            $scope.pageTitle = 'General Settings';

            $timeout(function () {
                $rootScope.$broadcast('navMain:changed', 'settings', 'settings');
            }, 100);

            $rootScope.$broadcast('nav:landed');
        };

        return SettingsCtrl;
    });

}(define));