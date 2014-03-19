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

        var HomePageHomeController = function ($scope, $rootScope, $location, currentUser) {

            console.log('[HomePage.HomeCtrl] initializing');

            if (currentUser.isLoggedIn()) {
                $location.path('/auth');
                return;
            }

            $scope.pageTitle = 'Anonymous Home Page';

            $rootScope.$broadcast('nav:landed', 'home');
        };

        return HomePageHomeController;
    });

}(define));