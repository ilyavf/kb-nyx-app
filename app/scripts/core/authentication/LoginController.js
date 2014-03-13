/**
 * Auth. Login controller
 *
 * @author      IlyaVF
 * @date        March 2014
 */

(function (define, angular) {
    'use strict';

    define([
    ],
    function () {
        var LoginController = function ($scope, currentUser) {
            $scope.name;
            currentUser.then(function (name) {
                $scope.name = name;
            });
        };

        return LoginController;
    });


}(define, angular));