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

        var PhotoGalleryCtrl = function ($scope, $routeParams, galleryRx) {

            console.log('[PhotoGallery.PhotoGalleryCtrl] initializing for ' + $routeParams.clusterName );

            $scope.title = $routeParams.albumName;

            $scope.pageMode = 'photo-gallery';

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

