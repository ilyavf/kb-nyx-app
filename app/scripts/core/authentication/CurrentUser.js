/**
 * CurrentUser resource.
 * Nyx.Auth module should define a factory 'currentUser' for this resource.
 *
 * @memberOf    NyxAuth
 * @member      CurrentUser
 *
 * @author      IlyaVF
 * @date        March 2014
 * @summary     To be used as a constructor for angular factory. Contains User Profile data and login and load profile methods.
 * @property    {function} get  - Returns user data promise
 * @property    {function} set  - Sets user data
 * @property    {function} login       - Performs async login and returns a promise
 * @property    {function} loadProfile - Loads user's profile and returns a user data promise
 * @property    {function} isLoggedIn  - Returns boolean
 */

(function (define) {
    'use strict';

    define([], function () {

        var currentUser = function ($q, $http, $log) {
            var userDeferred = $q.defer(),
                isLoggedIn = false,
                loginUrl = 'http://testb.kooboodle.com/user/openphoto/login.json',
                profileUrl = 'http://testb.kooboodle.com/user/profile.json',
                login, loadProfile;

            login = function (user, pswd) {
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
                    // data: {code, message, result}
                    if (!!data.result) {
                        isLoggedIn = true;
                        deferred.resolve(data);
                    } else {
                        isLoggedIn = false;
                        deferred.reject(data);
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

            loadProfile = function () {
                $http({
                    method: 'GET',
                    url: profileUrl,
                    withCredentials: true
                })
                .success(function(data, status, headers, config) {
                    $log.log('[CurrentUser.loadProfile]: received', arguments);
                    if (!!data.result) {
                        isLoggedIn = true;
                        userDeferred.resolve(data.result);
                    } else {
                        isLoggedIn = false;
                        userDeferred.reject({
                            success: false,
                            message: data.message || 'Unknown error'}
                        );
                    }
                })
                .error(function(data, status, headers, config) {
                    $log.error('[CurrentUser.loadProfile]: error', arguments);
                    userDeferred.reject({
                        success: false,
                        data: data.result,
                        message: data.message || 'Error while trying to load user\'s profile'}
                    );
                });
                return userDeferred.promise;
            };

            // Public API here:
            return {
                get: function () {
                    // should this return a new promise every time when the prev is unsuccessful or it was redefined by user?
                    return userDeferred.promise;
                },
                set: function (user) {

                },
                isLoggedIn: function () {
                    return isLoggedIn;
                },
                login: login,
                loadProfile: loadProfile
            };
        };

        return currentUser;

    });
}(define));