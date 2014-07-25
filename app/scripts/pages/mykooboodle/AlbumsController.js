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
            $scope.error = '';

            $scope.setupToolbar = function () {
                $scope.isActionToolbarReady.then(function () {
                    $rootScope.$broadcast('action-toolbar:config', {
                        logo: true,
                        share: true,
                        view: true,
                        select: true,
                        help: true,
                        logout: true
                    });
                });
            };
            $scope.$on('action-toolbar:reconfig', $scope.setupToolbar);
            $scope.setupToolbar();

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
            }, function (error) {
                $scope.loading = false;
                $scope.error = 'Unable to get the list of albums from server.';
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