/**
 * MyKooboodlePage Calendar controller
 *
 * @memberof    NyxMyPage
 * @member      CalendarController
 * @object
 * @property    {string} pageTitle - Calendar
 *
 * @author      IlyaVF
 * @date        March 27, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var CalendarController = function ($scope, $rootScope, $timeout) {

            $scope.pageTitle = 'Calendar';

            $timeout(function () {
                console.log('[CalendarController] init. Broadcasting to nav menu ...');
                $rootScope.$broadcast('navMain:changed', 'MyKooboodle', 'calendar');
            }, 100);
            $rootScope.$broadcast('nav:landed');
        };

        return CalendarController;
    });

}(define));