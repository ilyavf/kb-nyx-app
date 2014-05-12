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

    define([], function () {

        var PhotoGalleryCtrl = function ($scope, $routeParams, $rootScope, albumClusterList, albumPhotosData, galleryRx) {

            console.log('[PhotoGallery.PhotoGalleryCtrl] initializing for ' + $routeParams.clusterName );

            var dashedTitle = $routeParams.clusterDashedTitle,
                clusterP = albumClusterList.getItemByDashedTitle(dashedTitle),
                albumPhotos;

            clusterP.then(function (cluster) {
                $scope.title = cluster.title;
                $scope.id = cluster.aid;
                albumPhotos = albumPhotosData(cluster.aid);

                return albumPhotos.get();

            }).then(function (photos) {
                console.log('[PhotoGalleryCtrl.albumPhotos.get('+$scope.id+')]' + photos.length, photos);
                $scope.items = photos;
            });

            $scope.next = function () {
                albumPhotos.next().then(function (newItems) {
                    console.log('[next] ' + newItems.length, newItems);
                    newItems.forEach(function (newItem) {
                        $scope.items.push(newItem);
                    });
                });
            };
            $rootScope.$on('doc:end', $scope.next);



//            clusterList.get().then(function (clusterList) {
//                $scope.items = clusterList;
//            });
//
//            $scope.log = function (data) {
//                console.log('GALLERY ITEM CLICK: ' + data);
//            };
//
//            $scope.next = function () {
//                clusterList.next().then(function (newItems) {
//                    console.log('[next] ' + newItems.length, newItems);
//                    newItems.forEach(function (newItem) {
//                        $scope.items.push(newItem);
//                    });
//                });
//            };
//
//            $rootScope.$on('doc:end', $scope.next);
        };

        return PhotoGalleryCtrl;
    });

}(define));

