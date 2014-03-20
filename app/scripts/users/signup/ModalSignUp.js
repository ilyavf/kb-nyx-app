/**
 *
 * @memberOf    NyxAuth
 * @member      ModalSignUp
 * @property    {function} signup  - Opens a modal for signup
 *
 * @author      TonyTong
 * @date        March 2014
 *
 */

(function (define) {
    'use strict';

    define([
    ],
    function() {
        var ModalSignUp = function ($modal, $log, $rootScope) {

            var modalSignupCtrl = function() {

            };

            function signUp () {
                $modal.open({
                    templateUrl: 'views/modal_signup.html',
                    controller: modalSignupCtrl
                });
            };

            return {
                signUp: function () {
                    signUp();
                }
            };

        };

        return ModalSignUp;

    });
}(define));