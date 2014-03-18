define(['app'], function(app) {

    'use strict';

    describe('Controller: MainCtrl', function () {
        console.log('[mainCtrlSpec] Testing main controller...');

        // load the controller's module
        beforeEach(module('nyxWebApp'));

        var MainCtrl,
            scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            console.log('[mainCtrlSpec.beforeEach] instantiating controller...');
            scope = $rootScope.$new();
            MainCtrl = $controller('MainCtrl', {
                $scope: scope
            });
        }));

        it('should be in anonymous state', function () {
            console.log('[mainCtrlSpec.it] running 1...' + scope.state);
            expect(scope.state).toBe('anonymous');
            expect(scope.isLoggedIn).toBe(false);
        });
    });

});

/*
define(['controllers/main'], function (MainCtrl) {
    'use strict';

    describe('nyxWebApp: main controller', function () {

        console.log('[mainCtrlSpec] Testing main controller...');
        console.log('[mainCtrlSpec] typeof MainCtrl = ' + typeof MainCtrl);

        var mockApp,
            mainCtrl;

        beforeEach(function () {
            console.log('[mainCtrlSpec.beforeEach] mocking app and controller...');
            mockApp = angular.module('test', []);
            mockApp.controller('mainCtrl', MainCtrl);
        });


        it('should store state', inject(function ($controller, $rootScope) {
            console.log('[mainCtrlSpec.it] running...');
            var $scope = $rootScope.$new(),
                currentUser = {
                    isLoggedIn: function () { return false}
                };
            mainCtrl = $controller('mainCtrl', {
                $scope: $scope
                //currentUser: currentUser
            });
            console.log('[mainCtrlSpec] typeof mainCtrl = ' + typeof mainCtrl);
            console.log('[mainCtrlSpec] state = ' + $scope.state);
            expect($scope.state).toBe('anonymous');
        }));

    });


});
*/