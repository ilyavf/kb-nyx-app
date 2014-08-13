/**
 * Lightbox controller
 *
 * @memberof    NyxLightbox
 * @member      LightboxCtrl
 * @object
 *
 * @author      IlyaVF
 * @date        July 25, 2014
 */

(function (define) {
    'use strict';

    define([
        'utils/nx-utils'
    ], function (utils) {
        var _ = utils._;

        var LightboxCtrl = function ($scope, $rootScope) {
            $scope.isVisible = false;
            $scope.title = 'Lightbox';
            $scope.cluster = {};
            $scope.items = [];
            $scope.currentItem = _.head($scope.cluster.items);
            $scope.currentIndex = 0;
            $scope.isPrevActive = false;
            $scope.isNextActive = false;

            $scope.show = function (cluster, items, currentId) {
                console.log('[Lightbox.show] cluster, items, currentId:', cluster, items, currentId);
                $scope.cluster = cluster;
                $scope.items = items;
                $scope.currentItem = _.find(_.where({pid: currentId}), items) || _.head(items);
                $scope.currentIndex = $scope.items.indexOf($scope.currentItem);
                console.log('Lightbox.show: currentId=' + currentId + ', currentIndex=' + $scope.currentIndex + ', currentItem:', $scope.currentItem);
                $scope.isVisible = true;
                $scope.checkArrows($scope.currentIndex, $scope.items.length - 1);
            };
            $scope.hide = function () {
                $scope.isVisible = false;
                $scope.cluster = {items:[]};
                $scope.currentItem = {};
                $scope.$emit('pageMode:modal', false);
                $scope.$emit('broadcast', 'action-toolbar:reconfig');
            };

            $rootScope.$on('lightbox:show', function (e, cluster, items, currentId) {
                $scope.$emit('pageMode:modal', true);
                $scope.setupToolbar();
                $scope.show(cluster, items, currentId);
            });
            $scope.$on('lightbox:hide', $scope.hide);

            // setup toolbar:
            $scope.setupToolbar = function () {
                $scope.isActionToolbarReady.then(function () {
                    $rootScope.$broadcast('action-toolbar:config', {
                        back: {event: 'lightbox:hide'}
                    });
                });
            };
            $scope.checkArrows = function (cur, last) {
                $scope.isNextActive = cur < last;
                $scope.isPrevActive = cur > 0;
            };
            $scope.next = function () {
                if ($scope.currentIndex < $scope.items.length - 1) {
                    $scope.currentIndex++;
                    $scope.currentItem = $scope.items[$scope.currentIndex];
                    $scope.checkArrows($scope.currentIndex, $scope.items.length - 1);
                }
            };
            $scope.prev = function () {
                if ($scope.currentIndex > 0) {
                    $scope.currentIndex--;
                    $scope.currentItem = $scope.items[$scope.currentIndex];
                    $scope.checkArrows($scope.currentIndex, $scope.items.length - 1);
                }
            };
        };

        return LightboxCtrl;
    });

}(define));

