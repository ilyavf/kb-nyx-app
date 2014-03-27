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

            $scope.oneAtATime = true;
            $scope.active = {
                menu: 'MyKooboodle',
                item: ''
            };

            $scope.menus = [{
                title: 'My Kooboodle',
                code: 'MyKooboodle',
                isOpened: true,
                items: [{
                    name: 'Albums',
                    code: 'albums'
                },{
                    name: 'Calendar',
                    code: 'calendar'
                },{
                    name: 'Shared Photos',
                    code: 'shared'
                }]
            },{
                title: 'GIVE\'N\'GET',
                code: 'GiveNGet',
                items: [{
                    name: 'Find Friends',
                    code: 'friends'
                },{
                    name: 'Notifications',
                    code: 'notifications'
                }]
            }];

            $scope.setActive = function (menuCode, itemCode) {
                $scope.active.menu = menuCode;
                $scope.active.item = itemCode;
            };

            $scope.setActiveE = function (e, menuCode, itemCode) {
                e.preventDefault();
//                var itemIndex = $scope.menus
//                    .filter(function(m){return m.code == menuCode;})
//                    .map(function(m){return m.items;})
//                    .reduce(function(a,b){return a.concat(b);})
//                    .filter(function(v, i){return i.code == itemCode;});
                $scope.setActive(menuCode, itemCode);
                $rootScope.$broadcast('navMain:selected', menuCode, itemCode);
            };

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

            console.log('[MenuAuthMainCtrl] subscribing to "navMain:changed" event.');
            $rootScope.$on('navMain:changed', function (e, menuCode, itemCode) {
                console.log('[MenuAuthMainCtrl] captured navMain:changed with ' + menuCode + ', ' + itemCode);
                $scope.setActive(menuCode, itemCode);
            });
        };

        return MenuAuthMainCtrl;
    });

}(define));