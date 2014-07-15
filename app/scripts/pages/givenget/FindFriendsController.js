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

        var FindFriendsCtrl = function ($scope, $rootScope, $timeout, $facebook) {

            $scope.pageTitle = 'Find Friends';
            $scope.welcomeMsg = 'Please log in with Facebook';

            $timeout(function () {
                $rootScope.$broadcast('navMain:changed', 'GiveNGet', 'find-friends');
            }, 100);

            $rootScope.$broadcast('nav:landed');

            $scope.fbMe = function () {
                $facebook.api("/me").then(
                    function(response) {
                    $scope.welcomeMsg = "Welcome " + response.name;
                },
                function(err) {
                    $scope.welcomeMsg = "Please log in";
                });
            };
            $scope.fbLogin = function () {
                $facebook.login().then(
                    function(response) {
                        console.log('FB login', response);
                        $scope.welcomeMsg = "Welcome " + response;
                    },
                    function(err) {
                        $scope.welcomeMsg = "Please log in";
                    }
                );
            };
        };

        return FindFriendsCtrl;
    });

}(define));