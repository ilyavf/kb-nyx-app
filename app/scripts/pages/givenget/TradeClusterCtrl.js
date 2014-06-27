/**
 * Contact page controller
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
        'gallery/GalleryBaseController'
    ], function (GalleryBaseController) {
        var _ = ramda;

        var TradeClusterCtrl = function ($scope, $routeParams, $rootScope, tradeListData, tradeClusterData, galleryRx) {

            console.log('[GngPage.TradeClusterCtrl] initializing for ' + $routeParams.clusterDashedTitle + ' and user ' + $routeParams.userId);

            var dashedTitle = $routeParams.clusterDashedTitle,
                tradeeId = $routeParams.userId,
                clusterP = tradeListData.getItemByDashedTitle(dashedTitle),
                clusterPhotos;

            $scope.loading = true;
            $scope.title = false;

            clusterP.then(function (cluster) {
                $scope.id = cluster.id;
                var sharedItems = _.compose(_.get('sharedItems'), _.find(_.where({id: tradeeId})), _.get('matches'))(cluster);
                console.log('- cluster id = ' + cluster.id + ', sharedItems: ' + sharedItems);
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
                    $rootScope.$broadcast('action-toolbar:config', {
                        title: 'What photos do you want to trade?',
                        send: true,
                        cancel: 2,
                        back: false,
                        sort: false,
                        info: false,
                        view: false,
                        share: false,
                        logout: false,
                        help: false
                    });
                    $rootScope.$broadcast('action-toolbar:selectedTotal', photosPage.totalItems);
                    $rootScope.$broadcast('action-toolbar:selected', $scope.countSelected($scope.items));
                });
            });

            $scope.openLightbox = function (id) {
                console.log('[openLightbox] ', id);
            };

            function viewAction (event) {
                $scope.openLightbox($scope.items.reduce(function (acc, i) { return i.isSelected ? i.id : acc ;}, ''));
            };
        };

        return TradeClusterCtrl;
    });

}(define));

