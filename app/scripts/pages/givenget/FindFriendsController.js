/**
 * Give'N'Get Find Friends controller
 *
 * @memberof    NyxGngPage
 * @member      FindFriendsCtrl
 * @object
 * @property    {string} pageTitle - Find Friends
 *
 * @author      IlyaVF
 * @date        March 27, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var FindFriendsCtrl = function ($scope, $rootScope, $timeout) {

            $scope.pageTitle = 'Find Friends';

            $timeout(function () {
                $rootScope.$broadcast('navMain:changed', 'GiveNGet', 'find-friends');
            }, 100);

            $rootScope.$broadcast('nav:landed');
        };

        return FindFriendsCtrl;
    });

}(define));