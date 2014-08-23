/**
 * MyKooboodlePage CalendarMonth controller
 *
 * @memberof    NyxMyPage
 * @member      CalendarMonthCtrl
 * @object
 * @property    {string} pageTitle - Calendar Month
 *
 * @author      IlyaVF
 * @date        August 23, 2014
 */

(function (define) {
    'use strict';

    define([
        'gallery/PhotoGalleryCtrl'
    ], function (PhotoGalleryCtrl) {

        var CalendarMonthCtrl = function ($scope, $rootScope, $routeParams, $location, $timeout,
            calendarYearsData, calendarMonthPhotosData
        ){

            var parent,
                year = $routeParams.year,
                dashedTitle = $routeParams.dashedTitle;

            $scope.pageTitle = 'Calendar Month';
            $scope.loading = true;

            $scope.years = [];
            $scope.initYear = 0;
            $scope.arrowNavControl = { setItems: function(){} };

            calendarYearsData(year).get().then(function(months){
                console.log('CalendarMonthCtrl months: ', months);
                $scope.months = months;
                $scope.arrowNavControl.setItems(months, 0);

                // inherit from a parent controller:
                parent = PhotoGalleryCtrl($scope, $rootScope, $location, $timeout,
                    calendarMonthPhotosData(dashedTitle),
                    {
                        //nav: {menu: 'MyKooboodle', submenu: 'calendar'}
                    }
                );
            });

            $scope.changeMonth = function (month) {
                $scope.loading = true;
                console.log('[CalendarMonthCtrl.changeMonth] ' + month);
                parent && parent.setListData(calendarMonthsData(month));
                parent && parent.init();
            };

        };

        return CalendarMonthCtrl;
    });

}(define));