/**
 * App main controller
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
            // { anonymous | authorized }
            $scope.state = 'anonymous';
            $scope.isLoggedIn = currentUser.isLoggedIn();
            if (!$scope.isLoggedIn) {
                $location.path('/');
            }
            $scope.gotoState = function (state) {
                $scope.state = state;
            };
            $rootScope.$on('user:statusChanged', function (e, userStatus) {
                $scope.isLoggedIn = userStatus;
                $scope.state = userStatus ? 'authorized' : 'anonymous';
                $location.path('/auth');
            });
        };

        return MainController;
    });


}(define));