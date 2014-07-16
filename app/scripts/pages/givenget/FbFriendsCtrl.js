/**
 * Give'N'Get Facebook Friends page controller
 *
 * @memberof    NyxGngPage
 * @member      FbFriendsCtrl
 * @object
 * @property    {string} pageTitle - Find Friends
 *
 * @author      IlyaVF
 * @date        July 16, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var FindFriendsCtrl = function ($scope, $rootScope, $timeout, $location, FbData) {

            $scope.pageTitle = 'Add friends to get photos from shared events';
            $scope.items;

            FbData.friendsWithTags().then(function (friends) {
                $scope.items = friends;
            });
        };

        return FindFriendsCtrl;
    });

}(define));