/**
 * Controller for Trade cluster page with received items
 *
 * @memberof    NyxPhotoGallery
 * @member      Ctrl
 * @object
 *
 * @author      IlyaVF
 * @date        July 07, 2014
 */

(function (define) {
    'use strict';

    define([
        'gallery/GalleryBaseController',
        'utils/nx-utils',
        'domain/PhotoItems'
    ], function (GalleryBaseController, utils, DomainPhotoItems) {
        var _ = utils._;

        var TradeClusterReceivedCtrl = function (
            $scope, $routeParams, $rootScope,
            tradeListData, galleryRx
        ) {

            console.log('[GngPage.TradeClusterReceivedCtrl] initializing for ' + $routeParams.clusterDashedTitle + ' and user ' + $routeParams.userId);

            var dashedTitle = $routeParams.clusterDashedTitle,
                tradeeId = $routeParams.userId,
                clusterP = tradeListData.getItemByDashedTitle(dashedTitle),
                _cluster;

            $scope.loading = true;
            $scope.title = false;

            clusterP.then(function (cluster) {
                _cluster = cluster;
                cluster.id = cluster.cluster_id;
                $scope.id = cluster.id;
                var matchObj = _.compose(_.find(_.where({matchUid: tradeeId})), _.get('matches'))(cluster),
                    itemsReceived = _.prop('itemsReceived', matchObj),
                    userName = _.prop('matchFullname', matchObj);

                $scope.items = itemsReceived;

                $scope.loading = false;

                $scope.totalItems = itemsReceived.length;

                $scope.isActionToolbarReady.then(function () {
                    $rootScope.$broadcast('action-toolbar:config', {
                        title: 'You received ' + itemsReceived.length + ' photos from ' + userName,
                        back: 3,
                        sort: false,
                        info: false,
                        view: false,
                        share: false,
                        select: false,
                        logout: false,
                        help: false
                    });
                });
            });

            $scope.openLightbox = function (id) {
                console.log('[openLightbox] ', id);
            };

            function viewAction (event) {
                $scope.openLightbox($scope.items.reduce(function (acc, i) { return i.isSelected ? i.id : acc ;}, ''));
            };
        };

        return TradeClusterReceivedCtrl;
    });

}(define));

