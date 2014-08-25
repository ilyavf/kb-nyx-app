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

        var CalendarController = function ($scope, $rootScope, $routeParams, $location, $timeout, calendarClusterListData, calendarYearsData) {

            var parent,
                year = $routeParams.year || null;

            $scope.pageTitle = 'Calendar';
            $scope.loading = true;

            $scope.years = [];
            $scope.initYear = 0;
            $scope.arrowNavControl = { setItems: function(){} };

            calendarYearsData().get().then(function(years){
                years = years;
                console.log('CalendarController years: ', years);
                $scope.years = years;
                $scope.arrowNavControl.setItems(years, year ? years.indexOf(year) : years.length-1);

                // inherit from a parent controller:
                var _year = year || years[years.length-1]
                parent = GalleryClusterBaseCtrl($scope, $rootScope, $location, $timeout,
                    calendarClusterListData(_year),
                    {
                        gotoPath: '/auth/calendar/' + _year + '/',
                        nav: {menu: 'MyKooboodle', submenu: 'calendar'}
                    }
                );
            });

            $scope.changeYear = function (year) {
                $scope.loading = true;
                console.log('[CalendarController.changeYear] ' + year);
                parent && parent.setListData({
                    listData: calendarClusterListData(year),
                    options: {
                        gotoPath: '/auth/calendar/' + year + '/'
                    }
                });
                parent && parent.init();
            };

        };

        return CalendarController;
    });

}(define));