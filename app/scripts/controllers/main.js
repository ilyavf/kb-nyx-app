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
        var MainController = function ($scope, $rootScope, $route, $location, currentUser) {
            console.log('[MainController]: Initializing');
            $scope.isLoggedIn = currentUser.isLoggedIn();
            $scope.state =  $scope.isLoggedIn ? 'authorized' : 'anonymous';
            $scope.navBarActive = 'home';
            $scope.openSignInModal = function () {
                $rootScope.$broadcast('signin');
            };
//            if (!$scope.isLoggedIn) {
//                $location.path('/');
//            }
            $rootScope.$on('user:statusChanged', function (e, userStatus) {
                $scope.isLoggedIn = userStatus;
                $scope.state = userStatus ? 'authorized' : 'anonymous';
                $location.path(userStatus ? '/auth' : '/');
            });
            $rootScope.$on('nav:landed', function (e, navItemCode) {
                console.log('EVENT nav:landed', arguments);
                $scope.navBarActive = navItemCode;
            });
        };

        return MainController;
    });


}(define));