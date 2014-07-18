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

        var FindFriendsCtrl = function ($scope, $rootScope, $timeout, $location, FbData) {

            $scope.pageTitle = 'Add friends to get photos from shared events';
            //$scope.pageContent = "";
            $scope.isDisabled = false;
            $scope.welcomeMsg = 'Please log in with Facebook';

            $timeout(function () {
                $rootScope.$broadcast('navMain:changed', 'GiveNGet', 'find-friends');
            }, 100);

            $rootScope.$broadcast('nav:landed');

            $scope.isActionToolbarReady.then(function () {
                $rootScope.$broadcast('action-toolbar:config', {
                    title: 'Find Friends',
                    back: 3,
                    sort: false,
                    info: false,
                    view: false,
                    share: false,
                    select: false,
                    logout: true,
                    help: true
                });
            });

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
                        $location.path('/auth/find-friends/fb');
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