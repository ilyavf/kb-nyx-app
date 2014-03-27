/**
 * Contact page controller
 *
 * @memberof    NyxHomePage
 * @member      AboutCtrl
 * @object
 * @property    {string} pageTitle - About
 *
 * @author      IlyaVF
 * @date        March 19, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var HomePageAboutCtrl = function ($scope, $rootScope) {
            console.log('[HomePage.AboutCtrl] initializing');

            $scope.pageTitle = 'About';

            $rootScope.$broadcast('nav:landed', 'about');
            $rootScope.$broadcast('navMain:changed');
        };

        return HomePageAboutCtrl;
    });

}(define));