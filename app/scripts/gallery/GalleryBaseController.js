/**
 * Gallery Base controller
 *
 * @memberof    NyxPhotoGallery
 * @member      GalleryBaseController
 * @object
 *
 * @author      IlyaVF
 * @date        May 27, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        // THIS IS NOT a DI angular component! Argument order matters!
        var GalleryBaseController = function ($scope, $rootScope, itemListData, viewAction) {
            console.log('[GalleryBaseController] init');

            var listData = itemListData;

            $scope.loading = true;

            $scope.next = function (optionalPage) {
                $scope.loading = true;
                listData.next(optionalPage).then(function (newPage) {
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
            $scope.selectItem = function (item) {
                item.isSelected = !item.isSelected;
                $rootScope.$broadcast('action-toolbar:selected', $scope.countSelected($scope.items));
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
            //$scope.$on('doc:end', function () { $scope.next(); });
            $scope.$on('action-toolbar:selectAll', function () {
                $scope.selectAll($scope.items);
                $rootScope.$broadcast('action-toolbar:selected', $scope.items.length);
            });
            $scope.$on('action-toolbar:deselectAll', function () {
                $scope.deselectAll($scope.items);
                $rootScope.$broadcast('action-toolbar:selected', 0);
            });
            $scope.$on('action-toolbar:view', function (event) {
                viewAction(event);
                //$scope.gotoGallery($scope.items.reduce(function (acc, i) { return i.isSelected ? i.dashedTitle : acc ;} ), '');
            });
            $scope.$on('action-toolbar:share', function (event) {
                var selected = $scope.items.filter(function(i){ return i.isSelected;});

                if (selected.length == 0) return;

                $rootScope.$broadcast(
                    'share:photos',
                    selected.map(function(i){return i.pid;})
                );
            });

            return {
                setListData: function (_listData) {
                    console.log('[GalleryBaseController.setListData] new data list', _listData);
                    listData = _listData;
                    $scope.items = [];
                }
            };
        };

        return GalleryBaseController;
    });

}(define));