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
                    $rootScope.$broadcast('action-toolbar:selected', $scope.countSelected($scope.clusters));
                });
            });
            $scope.selectItem = function (cluster) {
                cluster.isSelected = !cluster.isSelected;
                $rootScope.$broadcast('action-toolbar:selected', $scope.countSelected($scope.clusters));
            };
            $scope.gotoGallery = function (urlTitle) {
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
            $scope.countSelected = function (items) {
                return items.reduce(function (acc, i) { return i.isSelected ? ++acc : acc; }, 0);
            };
            $scope.selectAll = function (items) {
                items.forEach(function (i) {
                    i.isSelected = true;
                });
            };
            $scope.deselectAll = function (items) {
                items.forEach(function (i) {
                    i.isSelected = false;
                });
            };
            $scope.$on('doc:end', $scope.next);
            $scope.$on('action-toolbar:selectAll', function (event) {
                $scope.selectAll($scope.clusters);
                $rootScope.$broadcast('action-toolbar:selected', $scope.clusters.length);
            });
            $scope.$on('action-toolbar:deselectAll', function (event) {
                $scope.deselectAll($scope.clusters);
                $rootScope.$broadcast('action-toolbar:selected', 0);
            });
        };

        return AlbumsController;
    });

}(define));