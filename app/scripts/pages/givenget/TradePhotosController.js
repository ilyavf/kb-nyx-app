/**
 * Give'N'Get TradePhotosCtrl controller
 *
 * @memberof    NyxGngPage
 * @member      TradePhotosCtrl
 * @object
 * @property    {string} pageTitle - Trade Photos
 *
 * @author      IlyaVF
 * @date        March 27, 2014
 */

(function (define) {
    'use strict';

    define([
        'gallery/GalleryBaseController'
    ], function (GalleryBaseController) {

        var TradePhotosCtrl = function ($scope, $rootScope, $location, $timeout, albumClusterList, galleryRx) {

            // inherit from the base class:
            GalleryBaseController($scope, $rootScope, albumClusterList, viewAction);

            console.log('[TradePhotosCtrl] init');

            $scope.pageTitle = 'Albums';
            $scope.error = '';

            $timeout(function () {
                $rootScope.$broadcast('navMain:changed', 'GiveNGet', 'trade-photos');
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

        return TradePhotosCtrl;
    });

}(define));