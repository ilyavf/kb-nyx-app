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

        var AlbumsController = function ($scope, $rootScope, $timeout, albumClusterList, galleryRx) {

            $scope.pageTitle = 'Albums';

            $timeout(function () {
                $rootScope.$broadcast('navMain:changed', 'MyKooboodle', 'albums');
            }, 100);
            $rootScope.$broadcast('nav:landed');


            // gallery:
            albumClusterList.get().then(function (albums) {
                $scope.items = albums;
            });
            $scope.log = function (data) {
                console.log('GALLERY ITEM CLICK: ' + data);
            };
            $scope.next = function () {
                albumClusterList.next().then(function (newItems) {
                    console.log('[next] ' + newItems.length, newItems);
                    newItems.forEach(function (newItem) {
                        $scope.items.push(newItem);
                    });
                });
            };
            $rootScope.$on('doc:end', $scope.next);
        };

        return AlbumsController;
    });

}(define));