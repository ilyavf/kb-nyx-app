define(['home/HomePageModule'], function() {

    'use strict';

    describe('Controller: AboutCtrl', function () {

        // load the controller's module
        beforeEach(module('Nyx.HomePage'));

        var scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            spyOn($rootScope, '$broadcast');

            $controller('HomePage.AboutCtrl', {
                $scope: scope
            });
        }));

        it('should have a correct page title', function () {
            expect(scope.pageTitle).toBe('About');
        });

        it('should fire "nav:landed" event', inject(function ($rootScope) {
            expect($rootScope.$broadcast).toHaveBeenCalledWith('nav:landed', 'about');
        }));
    });

});