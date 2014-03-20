/**
 * HomePage main controller
 *
 * @memberof    NyxHomePage
 * @member      HomeController
 * @object
 * @property    {string} pageTitle - Anonymous Home Page
 *
 * @author      IlyaVF
 * @date        March 19, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var HomePageHomeController = function ($scope, $rootScope) {

            $scope.pageTitle = 'Anonymous Home Page';

            $rootScope.$broadcast('nav:landed', 'home');
        };

        return HomePageHomeController;
    });

}(define));