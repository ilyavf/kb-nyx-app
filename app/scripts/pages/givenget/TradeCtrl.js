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

        var TradePhotosCtrl = function ($scope, $rootScope, $location, $timeout, tradeListData, galleryRx) {

            // inherit from the base class:
            GalleryBaseController($scope, $rootScope, tradeListData, viewAction);
            $scope.next = function () {};

            console.log('[TradePhotosCtrl] init');

            $scope.pageTitle = 'Trade';
            $scope.error = '';

            $timeout(function () {
                $rootScope.$broadcast('navMain:changed', 'GiveNGet', 'trade');
            }, 100);
            $rootScope.$broadcast('nav:landed');

            // gallery:
            tradeListData.get().then(function (clusterPage) {
                $scope.items = clusterPage.items;
                $scope.loading = false;
                console.log('EVENT: action-toolbar:selectedTotal ' + clusterPage.totalItems);
                $scope.isActionToolbarReady.then(function () {
                    $rootScope.$broadcast('action-toolbar:selectedTotal', clusterPage.totalItems);
                });
            }, function (error) {
                $scope.loading = false;
                $scope.error = 'Unable to get the list of albums from server.';
            });
            $scope.gotoGallery = function (dashedTitle) {
                if (!dashedTitle) return;

                $location.path('/auth/trades/' + dashedTitle);
            };
            function viewAction (event) {
                var targetName = $scope.items.reduce(function (acc, i) { return i.isSelected ? i.dashedTitle : acc ;}, '');
                console.log('[viewAction] ' + targetName);
                $scope.gotoGallery(targetName);
            };

            $scope.setupToolbar = function () {
                $scope.isActionToolbarReady.then(function () {
                    $rootScope.$broadcast('action-toolbar:config', {
                        logo: true,
                        title: 'Give Photos to Friends and Family and Get Photos from Them',
                        logout: true
                    });
                });
            };
            $scope.$on('action-toolbar:reconfig', $scope.setupToolbar);
            $scope.setupToolbar();
        };

        return TradePhotosCtrl;
    });

}(define));