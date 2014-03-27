/**
 * Give'N'Get Notifications controller
 *
 * @memberof    NyxGngPage
 * @member      NotificationsCtrl
 * @object
 * @property    {string} pageTitle - Find Friends
 *
 * @author      IlyaVF
 * @date        March 27, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var NotificationsCtrl = function ($scope, $rootScope, $timeout) {

            $scope.pageTitle = 'Notifications';

            $timeout(function () {
                $rootScope.$broadcast('navMain:changed', 'GiveNGet', 'notifications');
            }, 100);

            $rootScope.$broadcast('nav:landed');
        };

        return NotificationsCtrl;
    });

}(define));