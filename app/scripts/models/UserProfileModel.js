/**
 * UserProfile model
 *
 * @return      ng-service
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define) {
    'use strict';

    define([
    ],
    function () {
        var UserProfileModel = function ($request) {
            var isLoggedIn = false;

            this.username;
            this.name;
            this.email;
            this.$request = $request;

            this.isLoggedIn = function () {
                return isLoggedIn;
            };
            this.setLoggedIn = function (logged) {
                isLoggedIn = logged;
            };
        };
        UserProfileModel.prototype.login = function () {
            //this.$request();
            this.username = 'Test';
            this.name = 'Test Name';
            this.email = 'test@clickfree.com';
            this.setLoggedIn(true);
        };
        UserProfileModel.prototype.logout = function () {

        };
        UserProfileModel.prototype.signup = function () {

        };

        return UserProfileModel;
    });

}(define));