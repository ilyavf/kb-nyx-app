/**
 * Login modal dialog
 *
 * @memberOf    NyxAuth
 * @member      ModalSignIn
 * @property    {function} login  - Opens a modal for login/logout
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

            var mode = 'login';

            var modalLoginCtrl = function ($scope, $modalInstance, currentUser) {
                $scope.user = {};
                $scope.mode = mode;
                $scope.signIn = function () {
                    $log.log('Trying to log in using ' + $scope.user.email + ' and ' + $scope.user.password);
                    $scope.loginResult = 'pending';
                    $scope.loginMessage = 'Logging in...';
                    return currentUser.login($scope.user.email, $scope.user.password, (mode === 'signup' && !!$scope.user.name ? '' : undefined))
                        .then(function (loginResult) {
                            $log.log('- login completed');
                            $scope.loginMessage = loginResult.message;
                            $scope.loginResult = 'ok';
                            $scope.loginMessage += " Loading user's profile...";
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

            function login (_mode) {
                mode = _mode;
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
                    login('login');
                },
                signup: function () {
                    login('signup');
                }
            };
        };

        return ModalSignIn;
    });
}(define));