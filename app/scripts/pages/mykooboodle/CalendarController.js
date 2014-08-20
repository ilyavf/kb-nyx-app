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

    define([
        'gallery/GalleryClusterBaseCtrl'
    ], function (GalleryClusterBaseCtrl) {

        var CalendarController = function ($scope, $rootScope, $routeParams, $location, $timeout, calendarClusterListData) {

            var year = $routeParams.year || '2013';


            GalleryClusterBaseCtrl($scope, $rootScope, $location, $timeout, calendarClusterListData(year), {
                gotoPath: '/auth/albums/',
                nav: {menu: 'MyKooboodle', submenu: 'calendar'}
            });

            $scope.pageTitle = 'Calendar';

        };

        return CalendarController;
    });

}(define));