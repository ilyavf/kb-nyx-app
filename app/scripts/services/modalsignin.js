define([
    'services/currentuser'

], function (currentuser) { return function (app) {
    'use strict';

    currentuser(app);

    app.factory('ModalSignIn', function ($modal, $log, CurrentUser) {
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
                        CurrentUser.login($scope.user.name, $scope.user.password).
                            then(function (loginResult) {
                                $log.log('- login completed');
                                if (loginResult.success) {
                                    $log.log('-- successfully');
                                    $scope.loginMessage = loginResult.message;
                                    $scope.loginResult = 'ok';
                                    $scope.profileMessage = "Loading user's profile...";
                                    CurrentUser.loadProfile().then(function (profile) {
                                        if (profile.success) {
                                            $scope.profileResult = 'ok';
                                            $scope.profileMessage = 'Hi ' + profile.data.name + '! You have ' + profile.data.counts.photos + ' photos stored in Kooboodle.';
                                            $log.log('Profile result: ', profile);
                                        } else {
                                            $scope.profileResult = 'error';
                                            $scope.profileMessage = 'Profile error: ' + profile.message;
                                        }
                                    });
                                } else {
                                    $scope.loginMessage = loginResult.message;
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


}});