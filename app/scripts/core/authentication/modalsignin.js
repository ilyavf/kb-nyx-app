/**
 * CurrentUser singleton promise
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define) {
    'use strict';

    define([
        //'./CurrentUser'
    ],
    function () {
        var ModalSignIn = function ($modal, $log, currentUser) {

            function login () {
                $modal.open({
                    templateUrl: 'views/modal-sign-in.html',
                    controller: function ($scope) {
                        $scope.user = {};
                        $scope.signIn = function () {
                            $log.log('Trying to log in using ' + $scope.user.name + ' and ' + $scope.user.password);
                            $scope.loginResult = 'pending';
                            $scope.loginMessage = 'Logging in...'
                            $scope.profileMessage = '';
                            currentUser.login($scope.user.name, $scope.user.password).
                                then(function (loginResult) {
                                    $log.log('- login completed');
                                    $scope.loginMessage = loginResult.message;
                                    $scope.loginResult = 'ok';
                                    $scope.profileMessage = "Loading user's profile...";
                                    currentUser.loadProfile().then(function (profile) {
                                        $scope.profileResult = 'ok';
                                        $scope.profileMessage = 'Hi ' + profile.name + '! You have ' + profile.counts.photos + ' photos stored in Kooboodle.';
                                        $log.log('Profile result: ', profile);
                                    }, function (error) {
                                        $scope.profileResult = 'error';
                                        $scope.profileMessage = 'Profile error: ' + error.message;
                                    });
                                }, function (error) {
                                    $log.log('- login error: ' + error.message);
                                    $scope.loginMessage = error.message;
                                    $scope.loginResult = 'error';
                                });
                        };
                        $scope.signInFb = function () {};
                    }
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