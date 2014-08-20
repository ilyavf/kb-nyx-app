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
        'gallery/GalleryClusterBaseCtrl'
    ], function (GalleryClusterBaseCtrl) {

        var AlbumsController = function ($scope, $rootScope, $location, $timeout, albumClusterList, galleryRx) {

            GalleryClusterBaseCtrl($scope, $rootScope, $location, $timeout, albumClusterList, {
                gotoPath: '/auth/albums/',
                nav: {menu: 'MyKooboodle', submenu: 'albums'}
            });

            $scope.pageTitle = 'Albums';
        };

        return AlbumsController;
    });

}(define));