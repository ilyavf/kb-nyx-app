/**
 * Login modal dialog
 *
 * @memberOf    NyxAuth
 * @member      ModalSignIn
 * @property    {function} login  - Opens a modal for login
 * @property    {function} logout  - NOT IMPLEMENTED
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define) {
    'use strict';

    define([
    ],
    function () {
        var ModalSignIn = function ($modal, $log, currentUser, $rootScope) {

            var modalLoginCtrl = function ($scope, $modalInstance, currentUser) {
                $scope.user = {};
                $scope.signIn = function () {
                    $log.log('Trying to log in using ' + $scope.user.name + ' and ' + $scope.user.password);
                    $scope.loginResult = 'pending';
                    $scope.loginMessage = 'Logging in...';
                    return currentUser.login($scope.user.name, $scope.user.password)
                        .then(function (loginResult) {
                            $log.log('- login completed');
                            $scope.loginMessage = loginResult.message;
                            $scope.loginResult = 'ok';
                            $scope.loginMessage += "<br/>Loading user's profile...";
                            return currentUser.loadProfile();
                        })
                        .then(function (profile) {
                            $scope.loginResult = 'ok';
                            $scope.loginMessage = 'Hi ' + profile.name + '! You have ' + profile.counts.photos + ' photos stored in Kooboodle.';
                            $log.log('Profile result: ', profile);
                            $modalInstance.close();
                            $rootScope.$broadcast('user:statusChanged', true);
                        })
                        .catch(function (error) {
                            $log.log('Error: ' + error.message);
                            $scope.loginMessage = error.message;
                            $scope.loginResult = 'error';
                        });
                };
                $scope.signInFb = function () {};
            };

            var modalLogoutCtrl = function ($scope, $rootScope, $location, $modalInstance, currentUser) {
                $scope.doLogout = function () {
                    currentUser.logout();
                    $rootScope.$broadcast('user:statusChanged', false);
                    $modalInstance.close();
                };
            };

            function login () {
                if (currentUser.isLoggedIn()) {
                    $modal.open({
                        templateUrl: 'views/modal_logout.html',
                        controller: modalLogoutCtrl
                    });
                } else {
                    $modal.open({
                        templateUrl: 'views/modal_login.html',
                        controller: modalLoginCtrl
                    });
                }
            }

            // Public API here
            return {
                login: function () {
                    login();
                }
            };
        };

        return ModalSignIn;
    });
}(define));