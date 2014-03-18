/**
 * Login modal dialog
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define) {
    'use strict';

    define([
    ],
    function () {
        var ModalSignIn = function ($modal, $log, currentUser, $rootScope, $timeout) {

            var modalCtrl = function ($scope, $modalInstance) {
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
                            $timeout(function () {
                                $modalInstance.close();
                                $rootScope.$broadcast('user:statusChanged', true);
                            }, 1000);
                        })
                        .catch(function (error) {
                            $log.log('Error: ' + error.message);
                            $scope.loginMessage = error.message;
                            $scope.loginResult = 'error';
                        });
                };
                $scope.signInFb = function () {};
            };

            function login () {
                $modal.open({
                    templateUrl: 'views/modal-sign-in.html',
                    controller: modalCtrl
                });
            }

            function logout () {
                $log.log('Loggin out...');
            }

            // Public API here
            return {
                login: function () {
                    login();
                },
                logout: function () {
                    logout();
                }
            };
        };

        return ModalSignIn;
    });
}(define));