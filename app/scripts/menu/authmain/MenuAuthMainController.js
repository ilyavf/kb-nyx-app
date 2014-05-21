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
                menu: '',
                item: '',
                itemIndex: null
            };

            $scope.menus = [{
                title: 'My Kooboodle',
                code: 'MyKooboodle',
                iconClass: 'glyphicon-cloud',
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
                iconClass: 'glyphicon-retweet',
                items: [{
                    name: 'Find Friends',
                    code: 'find-friends'
                },{
                    name: 'Trade Photos',
                    code: 'trade-photos'
                }]
            },{
                title: 'Settings',
                code: 'settings',
                iconClass: 'glyphicon-cog',
                items: [{
                    name: 'General',
                    code: 'settings'
                }]
            }];

            $scope.isOpened = function (index, menuCode) {
                return !$scope.active.menu && index == 0 ? true : $scope.active.menu == menuCode;
            };

            $scope.setActive = function (menuCode, itemCode) {
                $scope.active.menu = menuCode;
                $scope.active.item = itemCode;
                $scope.active.itemIndex = $scope.menus
                    .reduce(function(p,c){return c.code&&c.code==menuCode ? c.items : p;}, [])
                    .reduce(function(p,c,i){return c.code&&c.code==itemCode ? i : p}, null);
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

            //console.log('[MenuAuthMainCtrl] subscribing to "navMain:changed" event.');
            $rootScope.$on('navMain:changed', function (e, menuCode, itemCode) {
                //console.log('[MenuAuthMainCtrl] captured navMain:changed with ' + menuCode + ', ' + itemCode);
                $scope.setActive(menuCode, itemCode);
            });
        };

        return MenuAuthMainCtrl;
    });

}(define));