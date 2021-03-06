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
        var MainController = function ($scope, $rootScope, $route, $routeParams, $location, $timeout, $window, $q, currentUser) {

            var isActionToolbarReady = $q.defer();

            console.log('[MainController]: Initializing');
            $scope.isLoggedIn = currentUser.isLoggedIn();
            $scope.state =  $scope.isLoggedIn ? 'authorized' : 'anonymous';
            $scope.isModal = false;
            $scope.navBarActive = 'home';
            $scope.isActionToolbarReady = isActionToolbarReady.promise;
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
            };
            $rootScope.$on('nav:landed', $scope.onNavLandedChanged);


            // Route validation:
            $rootScope.$on("$routeChangeError",function(event, next, current){
                console.log('[MainController::$routeChangeError] redirecting to ' + ($scope.isLoggedIn ? '/auth' : '/home'));
                $location.path($scope.isLoggedIn ? '/auth' : '/home');
            });

            // Switch between page views (regular | photo-gallery). Events: $routeChangeStart, $routeChangeSuccess
            $rootScope.$on("$routeChangeStart",function(event, next, current){
                console.log('[MainController::$routeChangeStart] ' + next.$$route.originalPath, next);
                if (next.$$route.pageMode) {
                    $scope.pageMode = next.$$route.pageMode;
                }
                else if (next.params.clusterDashedTitle) {
                    $scope.pageMode = 'photo-gallery';
                } else {
                    $scope.pageMode = 'regular';
                }
            });
            $rootScope.$on('action-toolbar:ready', function () {
                console.log('[MainController] EVENT action-toolbar:ready');
                isActionToolbarReady.resolve();
            });
            $rootScope.$on('action-toolbar:goBack', function (event, levels) {
                levels = parseInt(levels);
                levels = typeof levels === 'number' && !isNaN(levels) ? levels : 1;
                console.log('[MainController] EVENT action-toolbar:goBack by ' + levels);
                var re = new RegExp("(.*)(\\/[^\\/]+){" + levels + "}"),
                    pathMatches = $location.path().match(re);
                pathMatches && pathMatches[1] && $location.path(pathMatches[1]);
            });
            $scope.$on('broadcast', function (event, eventName) {
                console.log('[MainController] EVENT broadcast: ' + eventName);
                $scope.$broadcast(eventName);
            });
            var $body = angular.element('body');
            $rootScope.$on('pageMode:modal', function (e, on) {
                console.log('pageMode:modal ' + on);
                $body[on ? 'addClass' : 'removeClass']('page-modal');
            });

        };

        return MainController;
    });


}(define));