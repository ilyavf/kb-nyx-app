/**
 * Contact page controller
 *
 * @memberof    NyxPhotoGallery
 * @member      Ctrl
 * @object
 *
 * @author      IlyaVF
 * @date        April 7, 2014
 */

(function (define) {
    'use strict';

    define([
        'gallery/GalleryBaseController'
    ], function (GalleryBaseController) {

        var PhotoGalleryCtrl = function ($scope, $routeParams, $rootScope, albumClusterList, albumPhotosData, galleryRx) {

            console.log('[PhotoGallery.PhotoGalleryCtrl] initializing for ' + $routeParams.clusterDashedTitle );

            var dashedTitle = $routeParams.clusterDashedTitle,
                clusterP = albumClusterList.getItemByDashedTitle(dashedTitle),
                _cluster, _items,
                albumPhotos;

            $scope.loading = true;

            $scope.setupToolbar = function () {
                $scope.isActionToolbarReady.then(function () {
                    $rootScope.$broadcast('action-toolbar:config', {
                        back: true,
                        share: true,
                        view: true,
                        select: true,
                        refresh: true
                    });
                });
            };
            $scope.$on('action-toolbar:reconfig', $scope.setupToolbar);
            $scope.setupToolbar();

            clusterP.then(function (cluster) {
                _cluster = cluster;
                $scope.title = cluster.title;
                $scope.id = cluster.id;
                albumPhotos = albumPhotosData(cluster.id);

                // inherit from the base class:
                GalleryBaseController($scope, $rootScope, albumPhotos, viewAction);

                return albumPhotos.get();

            }).then(function (photosPage) {
                $scope.loading = false;
                var photos = photosPage.items;
                _items = photos;
                console.log('[PhotoGalleryCtrl.albumPhotos.get('+$scope.id+')]' + photos.length + ' (of ' + photosPage.totalItems + ')', photos);
                $scope.items = photos;
                $scope.totalItems = photosPage.totalItems || photos.length;

                console.log('EVENT: action-toolbar:selectedTotal ' + photosPage.totalItems);
                $scope.isActionToolbarReady.then(function () {
                    $rootScope.$broadcast('action-toolbar:selectedTotal', photosPage.totalItems);
                    $rootScope.$broadcast('action-toolbar:selected', $scope.countSelected($scope.items));
                });

                $scope.openLightbox = function (id) {
                    console.log('[openLightbox] ', id);
                    $scope.$emit('lightbox:show', _cluster, _items, id);
                };
            });

            function viewAction (event) {
                var itemId = $scope.items.reduce(function (acc, i) { return i.isSelected ? i.pid : acc ;});
                $scope.openLightbox && $scope.openLightbox(itemId);
            };
        };

        return PhotoGalleryCtrl;
    });

}(define));

