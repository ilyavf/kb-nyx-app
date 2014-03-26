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
 * @property    {function} isAuthenticated  - Returns immediate promise of user login status. To be used for route resolvers
 * @property    {function} isAnonymous      - Returns immediate promise of user login status. To be used for route resolvers
 */

(function (define) {
    'use strict';

    define([], function () {

        var currentUser = function ($q, $http, $log, $window) {
            var userDeferred = $q.defer(),
                isLoggedIn = false,
                loginUrl = 'http://testb.kooboodle.com/user/openphoto/login.json',
                requestUrl = loginUrl,
                profileUrl = 'http://testb.kooboodle.com/user/profile.json',
                signupUrl = 'http://testb.kooboodle.com/cf/user/register.json',
                login, logout, loadProfile, signup;

            checkLocalData();

            login = function (email, pswd, name) {
                var deferred = $q.defer(),
                    params = {
                        email: email,
                        password: pswd
                    },
                    mode = (typeof name === 'undefined' ? 'login' : 'signup');

                if (mode === 'signup') {
                    params.fullname = name;
                    requestUrl = signupUrl;
                }
                console.log('[currentUser.login] mode = ' + mode + ', ' + JSON.stringify(params));
                $http({
                    method: 'POST',
                    url: requestUrl,
                    data: Object.keys(params).map(function(key){
                        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                    }).join('&'),
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
                userDeferred = $q.defer()
                userDeferred.promise.catch(logout);

                $http({
                    method: 'GET',
                    url: profileUrl,
                    withCredentials: true
                })
                .success(function(data, status, headers, config) {
                    $log.log('[CurrentUser.loadProfile]: received', arguments);
                    if (!!data.result) {
                        isLoggedIn = true;
                        $window.localStorage.setItem('UserProfile', JSON.stringify(data.result));
                        $window.localStorage.setItem('IsLoggedIn', isLoggedIn);
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

            logout = function () {
                $window.localStorage.removeItem('UserProfile');
                $window.localStorage.setItem('IsLoggedIn', false);
                isLoggedIn = false;
            };

            function checkLocalData () {
                var userProfile = JSON.parse($window.localStorage.getItem('UserProfile')),
                    _isLoggedIn = $window.localStorage.getItem('IsLoggedIn');

                if (_isLoggedIn && userProfile) {
                    userDeferred.resolve(userProfile);
                    isLoggedIn = _isLoggedIn;
                }
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
                // to be used for route resolvers:
                isAuthenticated: function () {
                    var deferred = $q.defer();
                    if (isLoggedIn) {
                        deferred.resolve(true);
                    } else {
                        deferred.reject();
                    }
                    return deferred.promise;
                },
                // to be used for route resolvers:
                isAnonymous: function () {
                    var deferred = $q.defer();
                    if (!isLoggedIn) {
                        deferred.resolve(true);
                    } else {
                        deferred.reject();
                    }
                    return deferred.promise;
                },
                login: login,
                logout: logout,
                loadProfile: loadProfile
            };
        };

        return currentUser;

    });
}(define));