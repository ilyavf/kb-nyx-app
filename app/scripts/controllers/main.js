'use strict';

angular.module('nyxWebApp')
    .controller('MainCtrl', function ($scope, $modal, $log) {
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
        $scope.openSignInModal = function () {
            var modalInstance = $modal.open({
                templateUrl: 'views/modal-sign-in.html',
                controller: function ($scope) {
                    $scope.signIn = function () {};
                    $scope.signInFb = function () {};
                }
            });
        };
    });
