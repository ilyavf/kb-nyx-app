/**
 * App main controller
 *
 * @memberof nyxWebApp
 * @member  MainController
 * @object
 * @property    {string} state - State of the application {anonymous | authorized}
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        // Require $route service since there is no ng-view initially on the index page.
        var MainController = function ($scope, $rootScope, $route, $routeParams, $location, $timeout, $window, currentUser) {
            console.log('[MainController]: Initializing');
            $scope.isLoggedIn = currentUser.isLoggedIn();
            $scope.state =  $scope.isLoggedIn ? 'authorized' : 'anonymous';
            $scope.navBarActive = 'home';
            $scope.openSignInModal = function (mode) {
                $rootScope.$broadcast('signin', mode);
            };
            $window.hiddenSignUp = function () {
                $rootScope.$broadcast('signin', 'signup');
            };
            $scope.onUserStatusChanged = function (userStatus) {
                $scope.isLoggedIn = userStatus;
                $scope.state = userStatus ? 'authorized' : 'anonymous';
                $location.path(userStatus ? '/auth' : '/home');
            };
            $rootScope.$on('user:login', function () {
                $scope.onUserStatusChanged(true);
            });
            $rootScope.$on('user:logout', function () {
                $scope.onUserStatusChanged(false);
            });

            $scope.onNavLandedChanged = function (e, navItemCode) {
                $scope.navBarActive = navItemCode;
            }
            $rootScope.$on('nav:landed', $scope.onNavLandedChanged);


            // Route validation:
            $rootScope.$on("$routeChangeError",function(event, next, current){
                console.log('[MainController::$routeChangeError] redirecting to ' + ($scope.isLoggedIn ? '/auth' : '/home'));
                $location.path($scope.isLoggedIn ? '/auth' : '/home');
            });

            $rootScope.$on("$routeChangeSuccess",function(event, next, current){
                console.log('[MainController::$routeChangeSuccess] ' + $routeParams.clusterName, arguments);
                if ($routeParams.clusterName) {
                    $scope.pageMode = 'photo-gallery';
                } else {
                    $scope.pageMode = 'regular';
                }
            });


        };

        return MainController;
    });


}(define));