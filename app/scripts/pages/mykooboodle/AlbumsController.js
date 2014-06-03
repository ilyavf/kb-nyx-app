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

    define([
        'gallery/GalleryBaseController'
    ], function (GalleryBaseController) {

        var AlbumsController = function ($scope, $rootScope, $location, $timeout, albumClusterList, galleryRx) {

            // inherit from the base class:
            GalleryBaseController($scope, $rootScope, albumClusterList, viewAction);

            console.log('[AlbumsController] init');

            $scope.pageTitle = 'Albums';

            $timeout(function () {
                $rootScope.$broadcast('navMain:changed', 'MyKooboodle', 'albums');
            }, 100);
            $rootScope.$broadcast('nav:landed');

            // gallery:
            albumClusterList.get().then(function (albumsPage) {
                $scope.items = albumsPage.items;
                $scope.loading = false;
                console.log('EVENT: action-toolbar:selectedTotal ' + albumsPage.totalItems);
                $scope.isActionToolbarReady.then(function () {
                    $rootScope.$broadcast('action-toolbar:selectedTotal', albumsPage.totalItems);
                    $rootScope.$broadcast('action-toolbar:selected', $scope.countSelected($scope.items));
                });
            });
            $scope.gotoGallery = function (dashedTitle) {
                if (!dashedTitle) return;

                $location.path('/auth/albums/' + dashedTitle);
            };
            function viewAction (event) {
                var targetName = $scope.items.reduce(function (acc, i) { return i.isSelected ? i.dashedTitle : acc ;}, '');
                console.log('[viewAction] ' + targetName);
                $scope.gotoGallery(targetName);
            };
        };

        return AlbumsController;
    });

}(define));