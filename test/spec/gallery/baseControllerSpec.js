define(['gallery/GalleryBaseController'], function(GalleryBaseController) {
    'use strict';


    describe('Controller: GalleryBaseController', function () {

        angular.module('mockApp2', [])
            .controller('GalleryBaseController', GalleryBaseController);

        // load the controller's module
        beforeEach(module('mockApp2'));

        var scope,
            itemListDataMock,
            viewActionMock;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope, $q) {
            scope = $rootScope.$new();
            itemListDataMock = {
                next: function () {
                    var d = $q.defer();
                    d.resolve([{},{},{}]);
                    return d.promise;
                }
            };
            viewActionMock = {
                func: function (e) {}
            };

            spyOn($rootScope, '$on');
            spyOn($rootScope, '$broadcast');
            spyOn(itemListDataMock, 'next');
            spyOn(viewActionMock, 'func');

            $controller('GalleryBaseController', {
                $scope: scope,
                itemListData: itemListDataMock,
                viewAction: viewActionMock.func
            });
        }));

        it('should set loading to true', function () {
            expect(scope.loading).toBe(true);
        });

        it('should be able to count selected items', function () {
            expect(scope.countSelected([{isSelected: true}, {isSelected: false}, {isSelected: true}])).toBe(2);
        });

        it('should be able to select a passed item and broadcast select event', inject(function ($rootScope) {
            scope.items = [{isSelected: true}, {isSelected: false}, {isSelected: false}];
            scope.selectItem(scope.items[1]);
            expect(scope.items[1].isSelected).toBe(true);
            expect($rootScope.$broadcast).toHaveBeenCalledWith('action-toolbar:selected', 2);
        }));

        it('should be able to select all items', function () {
            var items = [{isSelected: true}, {isSelected: false}, {isSelected: false}];
            scope.selectAll(items);
            expect(items.filter(function(i){return i.isSelected;}).length).toBe(3);
        });

        it('should be able to deselect all items', function () {
            var items = [{isSelected: true}, {isSelected: false}, {isSelected: true}];
            scope.deselectAll(items);
            expect(items.filter(function(i){return i.isSelected;}).length).toBe(0);
        });

        it('should be able to deselect all items', function () {
            var items = [{isSelected: true}, {isSelected: false}, {isSelected: true}];
            scope.deselectAll(items);
            expect(items.filter(function(i){return i.isSelected;}).length).toBe(0);
        });

    });

});
