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

            $scope.show = function (cluster, items, currentId) {
                $scope.cluster = cluster;
                $scope.items = items;
                $scope.currentItem = _.find(_.where({pid: currentId}), items) || _.head(items);
                console.log('Lightbox.show: current=' + currentId + ', currentItem:', $scope.currentItem);
                $scope.isVisible = true;
                $scope.url = $scope.currentItem.url;
            };
            $scope.hide = function () {
                $scope.isVisible = false;
                $scope.cluster = {items:[]};
                $scope.currentItem = {};
                $scope.$emit('pageMode:modal', false);
                $rootScope.$broadcast('action-toolbar:reconfig');
            };

            $rootScope.$on('lightbox:show', function (e, cluster, items, currentId) {
                $scope.$emit('pageMode:modal', true);
                $scope.setupToolbar();
                $scope.show(cluster, items, currentId);
            });

            // setup toolbar:
            $scope.setupToolbar = function () {
                $scope.isActionToolbarReady.then(function () {
                    $rootScope.$broadcast('action-toolbar:config', {
                        cancel: false,
                        back: true,
                        sort: false,
                        info: false,
                        view: false,
                        share: true,
                        logout: false,
                        select: false,
                        help: true
                    });
                });
            };
        };

        return LightboxCtrl;
    });

}(define));

