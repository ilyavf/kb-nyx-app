define(['lightbox/LightboxModule'], function() {

    'use strict';

    describe('Controller: Lightbox', function () {

        // load the controller's module
        beforeEach(module('Nyx.Lightbox'));

        var scope,
            cluster,
            items,
            currentId;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            cluster = {};
            items = [{pid: 'a1'}, {pid: 'a2'}, {pid: 'a2'}];
            currentId = 'a3';

            $controller('LightboxCtrl', {
                $scope: scope
            });

        }));

        it('should setup lightbox on show', function () {
            spyOn(scope, 'checkArrows');

            scope.show(cluster, items, 'a2');
            expect(scope.isVisible).toBe(true);
            expect(scope.cluster).toBe(cluster);
            expect(scope.items).toBe(items);
            expect(scope.currentItem).toBe(items[1]);
            expect(scope.currentIndex).toBe(1);
            expect(scope.checkArrows).toHaveBeenCalled();
        });

        it('should send events on hide', function () {
            scope.show(cluster, items, 'a2');
            spyOn(scope, '$emit');

            scope.hide();

            expect(scope.isVisible).toBe(false);
            expect(scope.$emit.calls.length).toEqual(2);
            expect(scope.$emit.calls[0].args).toEqual(['pageMode:modal', false]);
            expect(scope.$emit.calls[1].args).toEqual(['broadcast', 'action-toolbar:reconfig']);
        });

        it('should update arrows activity', function () {
            expect(scope.isNextActive).toBe(false);
            expect(scope.isPrevActive).toBe(false);
            scope.checkArrows(3, 5);
            expect(scope.isNextActive).toBe(true);
            expect(scope.isPrevActive).toBe(true);
            scope.checkArrows(5, 5);
            expect(scope.isNextActive).toBe(false);
            expect(scope.isPrevActive).toBe(true);
            scope.checkArrows(0, 5);
            expect(scope.isNextActive).toBe(true);
            expect(scope.isPrevActive).toBe(false);
        });
    });

});