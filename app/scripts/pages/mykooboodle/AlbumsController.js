/**
 * MyKooboodlePage Calendar controller
 *
 * @memberof    NyxMyPage
 * @member      AlbumsController
 * @object
 * @property    {string} pageTitle - Albums
 *
 * @author      IlyaVF
 * @date        March 27, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var AlbumsController = function ($scope, $rootScope, $location, $timeout, albumClusterList, galleryRx) {
            console.log('[AlbumsController] init');

            $scope.pageTitle = 'Albums';
            $scope.loading = true;

            $timeout(function () {
                $rootScope.$broadcast('navMain:changed', 'MyKooboodle', 'albums');
            }, 100);
            $rootScope.$broadcast('nav:landed');


            // gallery:
            albumClusterList.get().then(function (albumsPage) {
                $scope.clusters = albumsPage.items;
                $scope.loading = false;
                console.log('EVENT: action-toolbar:selectedTotal ' + albumsPage.totalItems);
                $scope.isActionToolbarReady.then(function () {
                    $rootScope.$broadcast('action-toolbar:selectedTotal', albumsPage.totalItems);
                });
            });
            $scope.gotoGallery = function (urlTitle) {
                console.log('GALLERY ITEM CLICK: ' + urlTitle);
                $location.path('/auth/albums/' + urlTitle);
            };
            $scope.next = function () {
                $scope.loading = true;
                albumClusterList.next().then(function (newItems) {
                    $scope.loading = false;
                    if (!newItems || !newItems.length) return;

                    console.log('[next] ' + newItems.length, newItems);
                    newItems.forEach(function (newItem) {
                        $scope.clusters.push(newItem);
                    });
                }, function () {
                    $scope.loading = false;
                });
            };
            $scope.$on('doc:end', $scope.next);
        };

        return AlbumsController;
    });

}(define));