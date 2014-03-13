/**
 * CurrentUser singleton promise
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define) {
    'use strict';

    define([
        'models/UserProfileModel'
    ],
    function (UserProfileModel) {

        var currentUser = function ($q, $resource, $http) {
            var deferred = $q.defer(),
                isLoggedIn = false,
                loginUrl = 'http://testb.kooboodle.com/user/openphoto/login.json',
                profileUrl = 'http://testb.kooboodle.com/user/profile.json';

            return {
                get: function () {
                    // should this return every time a new promise if the prev is unsuccessful?
                    return deferred.promise;
                },
                set: function (user) {

                },
                isLoggedIn: function () {
                    return isLoggedIn;
                },
                login: login,
                loadProfile: loadProfile
            };

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
                    },
                    withCredentials: true
                })
                .success(function(data, status, headers, config) {
                    if (!!data.result) {
                        isLoggedIn = true;
                        deferred.resolve(data.result);
                    } else {
                        isLoggedIn = false;
                        deferred.reject({
                            success: false,
                            message: data.message || 'Unknown error'
                        });
                    }
                })
                .error(function(data, status, headers, config) {
                    $log.error('[CurrentUser.login]: error', arguments);
                    deferred.reject({
                        success: false,
                        message: 'System error'
                    });
                });
                return deferred.promise;
            };

            function loadProfile () {
                //var deferred = $q.defer();

                $http({
                    method: 'GET',
                    url: profileUrl,
                    withCredentials: true
                })
                .success(function(data, status, headers, config) {
                    $log.log('[CurrentUser.loadProfile]: received', arguments);
                    if (!!data.result) {
                        isLoggedIn = true;
                        deferred.resolve(data.result);
                    } else {
                        isLoggedIn = false;
                        deferred.reject({
                            success: false,
                            message: data.message || 'Unknown error'
                        });
                    }
                })
                .error(function(data, status, headers, config) {
                    $log.error('[CurrentUser.loadProfile]: error', arguments);
                    deferred.reject({
                        success: false,
                        data: data.result,
                        message: data.message || 'Error while trying to load user\'s profile'
                    });
                });

                //return deferred.promise;
            };
        };

        return currentUser;
    });

}(define));