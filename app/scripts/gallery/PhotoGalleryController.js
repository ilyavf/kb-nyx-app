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
                albumPhotos;

            clusterP.then(function (cluster) {
                $scope.title = cluster.title;
                $scope.id = cluster.aid;
                albumPhotos = albumPhotosData(cluster.aid);

                // inherit from the base class:
                GalleryBaseController($scope, $rootScope, albumPhotos, viewAction);

                return albumPhotos.get();

            }).then(function (photosPage) {
                $scope.loading = false;
                var photos = photosPage.items;
                console.log('[PhotoGalleryCtrl.albumPhotos.get('+$scope.id+')]' + photos.length + ' (of ' + photosPage.totalItems + ')', photos);
                $scope.items = photos;
                $scope.totalItems = photosPage.totalItems || photos.length;

                console.log('EVENT: action-toolbar:selectedTotal ' + photosPage.totalItems);
                $scope.isActionToolbarReady.then(function () {
                    $rootScope.$broadcast('action-toolbar:selectedTotal', photosPage.totalItems);
                    $rootScope.$broadcast('action-toolbar:selected', $scope.countSelected($scope.items));
                });
            });

            $scope.next = function () {
                $scope.loading = true;
                albumPhotos.next().then(function (newPage) {
                    $scope.loading = false;
                    var newItems = newPage.items;
                    console.log('[next] ' + newItems.length, newItems);
                    newItems.forEach(function (newItem) {
                        $scope.items.push(newItem);
                    });
                }, function () {
                    $scope.loading = false;
                });
            };
            $scope.openLightbox = function (id) {
                console.log('[openLightbox] ', id);
            };
            function viewAction (event) {
                $scope.openLightbox($scope.items.reduce(function (acc, i) { return i.isSelected ? i.id : acc ;}, ''));
            };
        };

        return PhotoGalleryCtrl;
    });

}(define));

