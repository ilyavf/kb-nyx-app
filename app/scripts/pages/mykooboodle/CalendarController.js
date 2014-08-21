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

            calendarYearsData.get().then(function(years){
                years = years && years.result || years; // fix mutable preprocess of the DataList.
                console.log('CalendarController years: ', years);
                $scope.years = years;
                $scope.arrowNavControl.setItems(years, year ? years.indexOf(year) : years.length-1);

                // inherit from a parent controller:
                parent = GalleryClusterBaseCtrl($scope, $rootScope, $location, $timeout,
                    calendarClusterListData(year || years[years.length-1]),
                    {
                        gotoPath: '/auth/albums/',
                        nav: {menu: 'MyKooboodle', submenu: 'calendar'}
                    }
                );
            });

            $scope.changeYear = function (year) {
                $scope.loading = true;
                console.log('[CalendarController.next] ' + year);
                parent && parent.setListData(calendarClusterListData(year));
                parent && parent.init();
            };

        };

        return CalendarController;
    });

}(define));