/**
 * Trade cluster page controller
 *
 * @memberof    NyxPhotoGallery
 * @member      Ctrl
 * @object
 *
 * @author      IlyaVF
 * @date        June 24, 2014
 */

(function (define) {
    'use strict';

    define([
        'gallery/GalleryBaseController',
        'utils/nx-utils',
        'domain/PhotoItems'
    ], function (GalleryBaseController, utils, DomainPhotoItems) {
        var _ = utils._;

        var TradeClusterCtrl = function (
            $scope, $routeParams, $rootScope,
            tradeListData, tradeClusterData, galleryRx, sharePhotosData
        ) {

            console.log('[GngPage.TradeClusterCtrl] initializing for ' + $routeParams.clusterDashedTitle + ' and user ' + $routeParams.userId);

            var dashedTitle = $routeParams.clusterDashedTitle,
                tradeeId = $routeParams.userId,
                clusterP = tradeListData.getItemByDashedTitle(dashedTitle),
                clusterPhotos,
                _cluster;

            $scope.loading = true;
            $scope.title = false;

            clusterP.then(function (cluster) {
                _cluster = cluster;
                cluster.id = cluster.cluster_id;
                $scope.id = cluster.id;
                var sharedItems = _.compose(_.get('itemsShared'), _.find(_.where({matchUid: tradeeId})), _.get('matches'))(cluster);
                console.log('- cluster id = ' + cluster.id + ', itemsShared: ' + sharedItems);
                clusterPhotos = tradeClusterData(cluster.id, sharedItems);

                // inherit from the base class:
                GalleryBaseController($scope, $rootScope, clusterPhotos, viewAction);

                return clusterPhotos.get();

            }).then(function (photosPage) {
                $scope.loading = false;
                var photos = photosPage.items;
                console.log('[TradeClusterCtrl.clusterPhotos.get('+$scope.id+')]' + photos.length + ' (of ' + photosPage.totalItems + ')', photos);
                $scope.items = photos;
                $scope.totalItems = photosPage.totalItems || photos.length;

                console.log('EVENT: action-toolbar:selectedTotal ' + photosPage.totalItems);
                $scope.isActionToolbarReady.then(function () {
                    $scope.$on('action-toolbar:send', function(){
                        $scope.sendShare(_cluster, $scope.items);
                    });
                });
                $scope.setupToolbar = function () {
                    $scope.isActionToolbarReady.then(function () {
                        $rootScope.$broadcast('action-toolbar:config', {
                            title: 'What photos do you want to trade?',
                            send: true,
                            cancel: 2
                        });
                        $rootScope.$broadcast('action-toolbar:selectedTotal', photosPage.totalItems);
                        $rootScope.$broadcast('action-toolbar:selected', $scope.countSelected($scope.items));
                    });
                };
                $scope.$on('action-toolbar:reconfig', $scope.setupToolbar);
                $scope.setupToolbar();
            });

            $scope.openLightbox = function (id) {
                console.log('[openLightbox] ', id);
            };

            $scope.sendShare = function (cluster, items) {
                var pids = _.compose(_.map(_.prop('pid')), _.filter(_.where({isSelected: true})))(items),
                    recipient = _.compose(_.prop('matchEmail'), _.find(_.where({matchUid: tradeeId})), _.get('matches'))(cluster);
                console.log('[TradeClusterCtrl.sendShare] recommendation_id=' + cluster.recommendation_id + ', pids=' + pids);

                sharePhotosData.send(pids, [recipient], cluster.recommendation_id)
                    .then(function () {
                        DomainPhotoItems.updateSharedItems(items, pids);
                        alert('Sent ' + pids.length + ' items');
                    })
                    .catch(function (err) {
                        alert('Cannot send items: ' + err);
                    });
            };

            function viewAction (event) {
                $scope.openLightbox($scope.items.reduce(function (acc, i) { return i.isSelected ? i.id : acc ;}, ''));
            };
        };

        return TradeClusterCtrl;
    });

}(define));

