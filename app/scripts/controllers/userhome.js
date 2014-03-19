/**
 * Authorized user home page controller
 *
 * @memberof    nyxWebApp
 * @member      UserHomeCtrl
 * @object
 * @property    {object} user - User profile
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var UserHomeCtrl = function ($scope, $rootScope, $location, currentUser) {
            console.log('[UserHomeCtrl]: Initializing');
            if (!currentUser.isLoggedIn()) {
                $location.path('/');
                return;
            }
            currentUser.get().then(function (profile) {
                $scope.user = profile;
            });

            $rootScope.$broadcast('nav:landed', 'home');
        };

        return UserHomeCtrl;
    });


}(define));