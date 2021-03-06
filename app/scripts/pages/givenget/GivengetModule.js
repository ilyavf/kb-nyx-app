/**
 * Nyx.GngPage
 * This module serves Give'N'Get pages: /auth/find-friends, /auth/trade-photos.
 *
 * @namespace   NyxGngPage
 * @author      IlyaVF
 * @date        March 27, 2014
 */

(function (define, angular) {
    'use strict';

    define([
        './GivengetRoutes',
        './FindFriendsController',
        './TradeCtrl',
        './TradeClusterCtrl',
        './TradeClusterReceivedCtrl',
        './FbFriendsCtrl'
    ],
    function (Routes, FindFriendsCtrl, TradeCtrl, TradeClusterCtrl, TradeClusterReceivedCtrl, FbFriendsCtrl) {
        var moduleName = "Nyx.GngPage";

        angular
            .module(moduleName, ['ngRoute'])
            .config(Routes)
            .controller("GngPage.FindFriendsCtrl", FindFriendsCtrl)
            .controller("GngPage.TradeCtrl", TradeCtrl)
            .controller("GngPage.TradeClusterCtrl", TradeClusterCtrl)
            .controller("GngPage.TradeClusterReceivedCtrl", TradeClusterReceivedCtrl)
            .controller("GngPage.FbFriendsCtrl", FbFriendsCtrl)

            // Handle global events:
            .run(function ($rootScope, $location) {
                $rootScope.$on('navMain:selected', function (event, menuCode, itemCode) {
                    if (menuCode === 'GiveNGet') {
                        $location.path('/auth/' + itemCode);
                    }
                });
            });

        return moduleName;
    });

}(define, angular));