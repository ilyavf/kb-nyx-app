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

            $rootScope.$on('user:statusChanged', function (e, userStatus) {
                $scope.isLoggedIn = userStatus;
                $scope.state = userStatus ? 'authorized' : 'anonymous';
                $location.path(userStatus ? '/auth' : '/');
            });
            $rootScope.$on('nav:landed', function (e, navItemCode) {
                console.log('EVENT nav:landed', arguments);
                $scope.navBarActive = navItemCode;
            });


            // Route validation:

            var authRoutes = ['/auth'],
                anonRoutes = ['/home'],
                mixedRoutes = ['/about', '/contact'];

            $scope.isRouteValid = function (nextPath, isLoggedIn) {
                console.log('[MainController] intercepting routing: nextPath = ' + nextPath + ', isLoggedIn = ' + isLoggedIn);
                var isValid = true;
                if (isLoggedIn && anonRoutes.indexOf(nextPath) > -1 ) {
                    console.log('- Trying to access anonymous when logged in. Redirecting to /auth');
                    isValid = false;
                }
                if (!isLoggedIn && authRoutes.indexOf(nextPath) > -1 ){
                    console.log('- Trying to access auth page when NOT logged in. Redirecting to /home');
                    isValid = false;
                }
                return isValid;
            };
            $scope.validateRoute = function (nextPath) {
                var isLoggedIn = $scope.isLoggedIn;

                if (!$scope.isRouteValid(nextPath, isLoggedIn)) {
                    $location.path(isLoggedIn ? '/auth' : '/home');
                }
            };
            $scope.validateRoute($location.path());

            $rootScope.$on("$locationChangeStart",function(event, next, current){
                var nextPath = next.match(/#(.*)/)[1],
                    isLoggedIn = $scope.isLoggedIn;

                if (!$scope.isRouteValid(nextPath, isLoggedIn)) {
                    event.preventDefault();
                    $location.path(isLoggedIn ? '/auth' : '/home');
                }
            });
        };

        return MainController;
    });


}(define));