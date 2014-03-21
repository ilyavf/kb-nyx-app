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
        var MainController = function ($scope, $rootScope, $route, $location, $timeout, currentUser) {
            console.log('[MainController]: Initializing');
            $scope.isLoggedIn = currentUser.isLoggedIn();
            $scope.state =  $scope.isLoggedIn ? 'authorized' : 'anonymous';
            $scope.navBarActive = 'home';
            $scope.openSignInModal = function () {
                $rootScope.$broadcast('signin');
            };

            $scope.onUserStatusChanged = function (e, userStatus) {
                $scope.isLoggedIn = userStatus;
                $scope.state = userStatus ? 'authorized' : 'anonymous';
                $location.path(userStatus ? '/auth' : '/');
            };
            $rootScope.$on('user:statusChanged', $scope.onUserStatusChanged);

            $scope.onNavLandedChanged = function (e, navItemCode) {
                console.log('EVENT nav:landed', arguments);
                $scope.navBarActive = navItemCode;
            }
            $rootScope.$on('nav:landed', $scope.onNavLandedChanged);


            // Route validation:

            var authRoutes = ['/auth'],
                anonRoutes = ['/home'],
                mixedRoutes = ['/about', '/contact'];

            $scope.isRouteValid = function (nextPath, isLoggedIn) {
                var isValid = true;
                if (isLoggedIn && anonRoutes.indexOf(nextPath) > -1 ) {
                    console.log('- Trying to access anonymous when logged in.');
                    isValid = false;
                }
                if (!isLoggedIn && authRoutes.indexOf(nextPath) > -1 ){
                    console.log('- Trying to access auth page when NOT logged in.');
                    isValid = false;
                }
                console.log('[MainController.isRouteValid] ( nextPath = ' + nextPath + ', isLoggedIn = ' + isLoggedIn + ' ) => ' + isValid);
                return isValid;
            };
            $scope.validateRouteOnInit = function (nextPath) {
                var isLoggedIn = $scope.isLoggedIn;

                if (!$scope.isRouteValid(nextPath, isLoggedIn)) {
                    $location.path(isLoggedIn ? '/auth' : '/home');
                }
            };
            $scope.validateRouteOnInit($location.path());

            $rootScope.$on("$locationChangeStart",function(event, next, current){
                var nextPath = next.match(/#(.*)/)[1],
                    isLoggedIn = $scope.isLoggedIn,
                    newPath;

                if (!$scope.isRouteValid(nextPath, isLoggedIn)) {
                    console.log('- intercepting invalid routing');
                    event.preventDefault();
                    newPath = isLoggedIn ? '/auth' : '/home';
                    console.log('- redirecting to ' + newPath);

                    $timeout(function () {
                        $location.path(newPath);
                    }, 0);
                }
            });
        };

        return MainController;
    });


}(define));