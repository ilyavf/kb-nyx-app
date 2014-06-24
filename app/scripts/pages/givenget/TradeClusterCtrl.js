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

        var TradeClusterCtrl = function ($scope, $routeParams, $rootScope, tradeListData, tradeClusterData, galleryRx) {

            console.log('[GngPage.TradeClusterCtrl] initializing for ' + $routeParams.clusterDashedTitle + ' and user ' + $routeParams.userId);

            var dashedTitle = $routeParams.clusterDashedTitle,
                tradeeId = $routeParams.userId,
                clusterP = tradeListData.getItemByDashedTitle(dashedTitle),
                albumPhotos;

            $scope.loading = true;
            $scope.title = 'What photos do you want to trade?'

            clusterP.then(function (cluster) {
                //$scope.title = cluster.title;
                $scope.id = cluster.id;
                albumPhotos = tradeClusterData(cluster.id);

                // inherit from the base class:
                GalleryBaseController($scope, $rootScope, albumPhotos, viewAction);

                return albumPhotos.get();

            }).then(function (photosPage) {
                $scope.loading = false;
                var photos = photosPage.items;
                console.log('[TradeClusterCtrl.albumPhotos.get('+$scope.id+')]' + photos.length + ' (of ' + photosPage.totalItems + ')', photos);
                $scope.items = photos;
                $scope.totalItems = photosPage.totalItems || photos.length;

                console.log('EVENT: action-toolbar:selectedTotal ' + photosPage.totalItems);
                $scope.isActionToolbarReady.then(function () {
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

