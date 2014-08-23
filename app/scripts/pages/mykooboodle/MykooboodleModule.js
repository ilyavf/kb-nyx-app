/**
 * Nyx.MyPage
 * This module serves My Kooboodle pages: /auth/albums, /auth/calendar, /auth/shared.
 *
 * @namespace   NyxMyPage
 * @author      IlyaVF
 * @date        March 27, 2014
 */

(function (define, angular) {
    'use strict';

    define([
        './MykooboodleRoutes',
        './AlbumsController',
        './CalendarController',
        './CalendarMonthCtrl',
        './SharedController'
    ],
    function (Routes, AlbumsCtrl, CalendarCtrl, CalendarMonthCtrl, SharedCtrl) {
        var moduleName = "Nyx.MyPage";

        angular
            .module(moduleName, ['ngRoute', 'Nyx.PhotoGallery'])
            .config(Routes)
            .controller('MyPage.AlbumsCtrl', AlbumsCtrl)
            .controller('MyPage.CalendarCtrl', CalendarCtrl)
            .controller('MyPage.CalendarMonthCtrl', CalendarMonthCtrl)
            .controller('MyPage.SharedCtrl', SharedCtrl)

            // Handle global events:
            .run(function ($rootScope, $location) {
                $rootScope.$on('navMain:selected', function (event, menuCode, itemCode) {
                    if (menuCode === 'MyKooboodle') {
                        $location.path('/auth/' + itemCode);
                    }
                });
            });

        return moduleName;
    });

}(define, angular));