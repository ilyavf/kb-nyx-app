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

    define([], function () {

        var TradePhotosCtrl = function ($scope, $rootScope, $timeout) {

            $scope.pageTitle = 'Trade Photos';

            $timeout(function () {
                $rootScope.$broadcast('navMain:changed', 'GiveNGet', 'trade-photos');
            }, 100);

            $rootScope.$broadcast('nav:landed');
        };

        return TradePhotosCtrl;
    });

}(define));