/**
 * Gallery Cluster Base controller
 *
 * @memberof    NyxPhotoGallery
 * @member      GalleryClusterBaseCtrl
 * @object
 *
 * @author      IlyaVF
 * @date        August 19, 2014
 */

(function (define) {
    'use strict';

    define([
        'gallery/GalleryBaseController'
    ], function (GalleryBaseController) {

        // THIS IS NOT a DI angular component! Argument order matters!
        var GalleryClusterBaseCtrl = function ($scope, $rootScope, $location, $timeout, albumClusterList, options) {

            options = angular.extend({
                gotoPath: '/auth/albums/',
                toolbarCfg: {
                    logo: true,
                    share: true,
                    view: true,
                    select: true,
                    logout: true
                },
                nav: {menu: 'MyKooboodle', submenu: 'albums'}
            }, options);

            var listData = albumClusterList;

            // inherit from the base class:
            var baseApi = GalleryBaseController($scope, $rootScope, listData, viewAction);

            var setListData = function (newListData) {
                listData = newListData;
                baseApi.setListData(newListData);
            };

            console.log('[GalleryClusterBaseCtrl] init');

            $scope.pageTitle = 'Gallery Cluster Base Controller';
            $scope.error = '';

            $scope.setupToolbar = function () {
                $scope.isActionToolbarReady.then(function () {
                    $rootScope.$broadcast('action-toolbar:config', options.toolbarCfg);
                });
            };
            $scope.$on('action-toolbar:reconfig', $scope.setupToolbar);
            $scope.setupToolbar();

            $timeout(function () {
                $rootScope.$broadcast('navMain:changed', options.nav.menu, options.nav.submenu);
            }, 100);
            $rootScope.$broadcast('nav:landed');

            // gallery init:
            var init = function () {
                listData.get().then(function (albumsPage) {
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
                    console.log('ERROR: GalleryClusterBaseCtrl cannot load cluster list: ' + error);
                });
            };
            $scope.gotoGallery = function (dashedTitle) {
                if (!dashedTitle) return;

                $location.path(options.gotoPath + dashedTitle);
            };
            function viewAction (event) {
                var targetName = $scope.items.reduce(function (acc, i) { return i.isSelected ? i.dashedTitle : acc ;}, '');
                console.log('[viewAction] ' + targetName);
                $scope.gotoGallery(targetName);
            };

            init();

            return {
                setListData: setListData,
                init: init
            };
        };

        return GalleryClusterBaseCtrl;
    });

}(define));