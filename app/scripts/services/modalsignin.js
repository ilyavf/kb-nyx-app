'use strict';

angular.module('nyxWebApp')
    .factory('ModalSignIn', function ($modal, $log, CurrentUser) {
        function login () {
            $modal.open({
                templateUrl: 'views/modal-sign-in.html',
                controller: function ($scope) {
                    $scope.user = {};
                    $scope.signIn = function () {
                        $log.log('Trying to log in using ' + $scope.user.name + ' and ' + $scope.user.password);
                        CurrentUser.login($scope.user.name, $scope.user.password).
                            then(function (loginResult) {
                                $log.log('- login completed');
                                if (loginResult.success) {
                                    $log.log('-- successfully');
                                    $scope.message = loginResult.message;
                                    $scope.loginResult = 'ok';
                                    CurrentUser.loadProfile().then(function (profile) {
                                        $log.log('Profile result: ', profile);
                                    });
                                } else {
                                    $scope.message = loginResult.message;
                                    $scope.loginResult = 'error';
                                }
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
    });
