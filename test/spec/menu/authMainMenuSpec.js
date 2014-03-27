define(['menu/authmain/MenuAuthMainModule'], function () {
    'use strict';

    describe('Menu: Auth Main Menu', function () {

        // load the service's module
        beforeEach(module('Nyx.Menu.AuthMain'));

        var scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            spyOn($rootScope, '$on');
            spyOn($rootScope, '$broadcast');
            scope = $rootScope.$new();
            $controller('Nyx.Menu.AuthMain.Ctrl', {
                $scope: scope
            });
        }));

        it('should have the following properties and methods ', function () {
            expect(scope.active).toBeDefined();
            expect(scope.menus).toBeDefined();
            expect(typeof scope.setActive).toBe('function');
            expect(typeof scope.setActiveE).toBe('function');
            expect(typeof scope.isOpened).toBe('function');
        });

        it('should subscribe to "navMain:changed" event', inject(function ($rootScope) {
            expect($rootScope.$on.calls[0].args[0]).toBe('navMain:changed');
        }));

        it('should open accordion block with related item (isOpened)', function () {
            scope.active = {
                menu: 'MyKooboodle',
                item: 'calendar'
            };
            expect(scope.isOpened(0, 'MyKooboodle')).toBe(true);
            expect(scope.isOpened(1, 'GiveNGet')).toBe(false);
            expect(scope.isOpened(2, 'settings')).toBe(false);

            scope.active = {
                menu: 'GiveNGet',
                item: 'find-friends'
            };
            expect(scope.isOpened(0, 'MyKooboodle')).toBe(false);
            expect(scope.isOpened(1, 'GiveNGet')).toBe(true);
            expect(scope.isOpened(2, 'settings')).toBe(false);
        });

        it('should be able to set active item', function () {
            scope.setActive ('MyKooboodle', 'calendar');
            expect(scope.active.menu).toBe('MyKooboodle');
            expect(scope.active.item).toBe('calendar');

            scope.setActive ('GiveNGet', 'notifications');
            expect(scope.active.menu).toBe('GiveNGet');
            expect(scope.active.item).toBe('notifications');
        });

        it('should be able to set active item and send related event', inject(function ($rootScope) {
            var mockEvent = {
                preventDefault: function () {}
            };
            scope.setActiveE (mockEvent, 'MyKooboodle', 'albums');
            expect(scope.active.menu).toBe('MyKooboodle');
            expect(scope.active.item).toBe('albums');
            expect($rootScope.$broadcast).toHaveBeenCalledWith('navMain:selected', 'MyKooboodle', 'albums');
        }));

    });
});
