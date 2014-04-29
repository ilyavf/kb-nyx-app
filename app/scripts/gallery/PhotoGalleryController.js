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

        var PhotoGalleryCtrl = function ($scope, $rootScope, clusterList) {
            console.log('[PhotoGallery.Ctrl] initializing');

            $scope.pageTitle = 'Photo Gallery';

            clusterList.get().then(function (clusterList) {
                $scope.items = clusterList;
            });

            $scope.log = function (data) {
                console.log('GALLERY ITEM CLICK: ' + data);
            };

        };

        return PhotoGalleryCtrl;
    });

}(define));

