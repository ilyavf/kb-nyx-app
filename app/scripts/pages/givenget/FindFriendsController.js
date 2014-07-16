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

        var FindFriendsCtrl = function ($scope, $rootScope, $timeout, FbData) {

            $scope.pageTitle = 'Add friends to get photos from shared events';
            //$scope.pageContent = "";
            $scope.isDisabled = false;
            $scope.welcomeMsg = 'Please log in with Facebook';

            $timeout(function () {
                $rootScope.$broadcast('navMain:changed', 'GiveNGet', 'find-friends');
            }, 100);

            $rootScope.$broadcast('nav:landed');

            $scope.fbMe = function () {
                FbData.me().then(
                    function(response) {
                    $scope.welcomeMsg = "Welcome " + response.name;
                },
                function(err) {
                    $scope.welcomeMsg = "Please log in";
                });
            };
            $scope.fbLogin = function () {
                FbData.perm('user_photos').then(
                    function(response) {
                        console.log('FB login', response);
                        $scope.welcomeMsg = "Welcome " + response;
                    },
                    function(err) {
                        $scope.welcomeMsg = "Please log in";
                    }
                );
            };
            window.FbData = FbData;
        };

        return FindFriendsCtrl;
    });

}(define));