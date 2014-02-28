'use strict';

angular.module('nyxWebApp')
    .factory('CurrentUser', function ($q, $http, $log) {

        // should these be promises?
        var isLoggedIn = false,
            userProfile = {},
            loginUrl = 'http://testb.kooboodle.com/user/openphoto/login.json',
            profileUrl = 'http://testb.kooboodle.com/user/profile.json';

        function login (user, pswd) {
            var deferred = $q.defer();

            $http({
                    method: 'POST',
                    url: loginUrl,
                    data: $.param({
                        email: user,
                        password: pswd
                    }),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    }
                }).
                success(function(data, status, headers, config) {
                    deferred.resolve({
                        success: !!data.result,
                        message: data.message || 'Unknown error'
                    });
                }).
                error(function(data, status, headers, config) {
                    $log.error('[CurrentUser.login]: error', arguments);
                    deferred.resolve({
                        success: false,
                        message: 'System error'
                    });
                });

            return deferred.promise;
        }

        function loadProfile () {
            var deferred = $q.defer();

            $http({method: 'GET', url: profileUrl}).
                success(function(data, status, headers, config) {
                    $log.log('[CurrentUser.loadProfile]: received', arguments);
                    deferred.resolve(true);
                }).
                error(function(data, status, headers, config) {
                    $log.error('[CurrentUser.loadProfile]: error', arguments);
                    deferred.resolve(false);
                });

            return deferred.promise;
        }

        // Public API here
        return {
            isUserLoggedIn: function () {
                return isLoggedIn;
            },
            getUserProfile: function () {
                return userProfile;
            },
            login: function (user, pswd) {
                return login(user, pswd);
            },
            loadProfile: function () {
                return loadProfile();
            }
        };
    });
