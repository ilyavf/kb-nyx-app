/**
 * Authorized user home page controller
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var UserHomeCtrl = function ($scope, $location, currentUser) {
            console.log('[UserHomeCtrl]: Initializing');
            if (!currentUser.isLoggedIn()) {
                $location.path('/');
                return;
            }
            currentUser.get().then(function (profile) {
                $scope.user = profile;
            });
        };

        return UserHomeCtrl;
    });


}(define));