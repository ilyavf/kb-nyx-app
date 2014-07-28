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

            currentUser.get().then(function (profile) {
                $scope.user = profile;
            });

            $rootScope.$broadcast('nav:landed', 'home');

            $scope.setupToolbar = function () {
                $scope.isActionToolbarReady.then(function () {
                    $rootScope.$broadcast('action-toolbar:config', {
                        logo: true,
                        title: 'Welcome to Kooboodle',
                        logout: true,
                        help: true
                    });
                });
            };
            $scope.setupToolbar();
        };

        return UserHomeCtrl;
    });


}(define));