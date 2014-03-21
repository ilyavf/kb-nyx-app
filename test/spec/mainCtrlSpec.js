define(['controllers/main'], function(mainCtrl) {
    'use strict';

    angular.module('mockApp', ['ngRoute'])
        .controller('MainCtrl', mainCtrl);

    describe('Controller: MainCtrl', function () {

        // load the controller's module
        beforeEach(module('mockApp'));

        var scope;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            spyOn($rootScope, '$on');
            $controller('MainCtrl', {
                $scope: scope,
                currentUser: {
                    isLoggedIn: function () { return false; }
                }
            });
        }));

        it('should be in anonymous state if user is not logged in', function () {
            expect(scope.state).toBe('anonymous');
            expect(scope.isLoggedIn).toBe(false);
        });

        it('should have a validateRouteOnInit', function () {
            expect(typeof scope.validateRouteOnInit).toBe('function');
        });

        it('should validate routes correctly', function () {
            expect(scope.isRouteValid('/auth', false)).toBe(false);
            expect(scope.isRouteValid('/auth', true)).toBe(true);
            expect(scope.isRouteValid('/home', false)).toBe(true);
            expect(scope.isRouteValid('/home', true)).toBe(false);
        });

        it('should subscribe to "user:statusChanged" event', inject(function ($rootScope) {
            // The $route service subscribes to $locationChangeStart event before us.
            expect($rootScope.$on.calls[1].args[0]).toBe('user:statusChanged');
        }));

        it('should subscribe to "nav:landed" event', inject(function ($rootScope) {
            expect($rootScope.$on.calls[2].args[0]).toBe('nav:landed');
        }));

        it('should subscribe to "$locationChangeStart" event', inject(function ($rootScope) {
            expect($rootScope.$on.calls[3].args[0]).toBe('$locationChangeStart');
        }));

        it('should update its state when user status changes to LOGGED-IN', function () {
            scope.onUserStatusChanged({}, true);
            expect(scope.state).toBe('authorized');
            expect(scope.isLoggedIn).toBe(true);
        });

        it('should update its state when user status changes to LOGGED-OUT', function () {
            scope.onUserStatusChanged({}, false);
            expect(scope.state).toBe('anonymous');
            expect(scope.isLoggedIn).toBe(false);
        });

        it('should update navbar item on its change event', function () {
            scope.onNavLandedChanged({}, 'about');
            expect(scope.navBarActive).toBe('about');
        });
    });

});


//        beforeEach(module('mockApp', function ($provide) {
//            $provide.factory('currentUser', function () {
//                return {
//                    isLoggedIn: function () { return false; }
//                }
//            });
//        }));