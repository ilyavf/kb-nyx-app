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
            $scope.cluster = {items:[]};
            $scope.currentItem = _.head($scope.cluster.items);

            $scope.show = function (cluster, current) {
                current = current || 0;
                $scope.cluster = cluster;
                $scope.currentItem = _.nth(current, $scope.cluster.items);
                $scope.isVisible = true;
            };
            $scope.hide = function () {
                $scope.isVisible = false;
                $scope.cluster = {items:[]};
                $scope.currentItem = {};
                $scope.$emit('pageMode:modal', false);
                $rootScope.$broadcast('action-toolbar:reconfig');
            };

            $rootScope.$on('lightbox:show', function (e, cluster, current) {
                $scope.$emit('pageMode:modal', true);
                $scope.setupToolbar();
                $scope.show(cluster, current);
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

