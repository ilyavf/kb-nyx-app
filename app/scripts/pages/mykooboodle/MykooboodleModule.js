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
        './SharedController'
    ],
    function (Routes, AlbumsCtrl, CalendarCtrl, SharedCtrl) {
        var moduleName = "Nyx.MyPage";

        angular
            .module(moduleName, ['ngRoute'])
            .config(Routes)
            .controller("MyPage.AlbumsCtrl", AlbumsCtrl)
            .controller("MyPage.CalendarCtrl", CalendarCtrl)
            .controller("MyPage.SharedCtrl", SharedCtrl)

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