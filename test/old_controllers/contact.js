define(['app'], function(app) {

    'use strict';

    describe('Controller: ContactCtrl', function () {

      // load the controller's module
      beforeEach(module('nyxWebApp'));

      var ContactCtrl,
        scope;

      // Initialize the controller and a mock scope
      beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        ContactCtrl = $controller('ContactCtrl', {
          $scope: scope
        });
      }));

      it('should show Contact page title', function () {
          expect(scope.pageTitle).toBe('Contact');
      });
    });

});