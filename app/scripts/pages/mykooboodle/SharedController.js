/**
 * MyKooboodlePage Shared Photos controller
 *
 * @memberof    NyxMyPage
 * @member      SharedController
 * @object
 * @property    {string} pageTitle - Shared Photos
 *
 * @author      IlyaVF
 * @date        March 27, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var SharedController = function ($scope, $rootScope, $timeout) {

            $scope.pageTitle = 'Shared Photos';

            $timeout(function () {
                $rootScope.$broadcast('navMain:changed', 'MyKooboodle', 'shared');
            }, 100);
            $rootScope.$broadcast('nav:landed');
        };

        return SharedController;
    });

}(define));