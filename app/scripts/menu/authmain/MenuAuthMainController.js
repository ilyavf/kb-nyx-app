/**
 * Controller for the main auth menu.
 *
 * @memberof    NyxHomePage
 * @member      MenuAuthMainCtrl
 * @object
 * @property    {array}     items           - Array of menu items
 * @property    {array}     active          - Index of the current active menu item
 * @property    {function}  setItems        - Sets items
 * @property    {function}  getItem         - Returns menu item by its code or index
 * @property    {function}  getCurrentItem  - Returns menu item by its code or index
 * @property    {function}  setActive       - Returns menu item by its code or index
 *
 * @author      IlyaVF
 * @date        March 24, 2014
 */

(function (define) {
    'use strict';

    define([], function () {

        var MenuAuthMainCtrl = function ($scope, $rootScope) {

            $scope.active = 0;
            $scope.items = [{
                name: 'Test Albums',
                href: '#'
            },{
                name: 'Test Calendar',
                href: '#'
            }];

            $scope.setItems = function (items, active) {
                $scope.items = items;
                $scope.setActive(active || 0);
            };

            $scope.getItem = function (itemCode) {
                return $scope.items[itemCode];
            };

            $scope.getCurrentItem = function () {
                return $scope.getItem($scope.active);
            };

            $scope.setActive = function (itemCode) {
                $scope.active = itemCode;
                $rootScope.$broadcast('navMain:selected', { code: itemCode, item: $scope.getItemByCode(itemCode) });
            };

            $rootScope.$on('navMain:changed', function (e, itemCode) {
                $scope.active = itemCode;
            });
        };

        return MenuAuthMainCtrl;
    });

}(define));