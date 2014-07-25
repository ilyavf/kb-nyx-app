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

            FbData.getFriendsWithInfo().then(function (friends) {
                $scope.items = friends;
            });

            $scope.invite = function (friend, remind) {
                if (friend.isInvited && !remind) {
                    return;
                }
                FbData.invite(friend.id).then(function () {
                    friend.isInvited = true;
                    console.log('invite success', friend);
                });
            };

            $scope.setupToolbar = function () {
                $scope.isActionToolbarReady.then(function () {
                    $rootScope.$broadcast('action-toolbar:config', {
                        title: 'Find Friends',
                        cancel: true,
                        mainActionTitle: 'Finish Inviting',
                        back: true
                    });
                });
            };
            $scope.$on('action-toolbar:reconfig', $scope.setupToolbar);
            $scope.setupToolbar();
        };

        return FindFriendsCtrl;
    });

}(define));