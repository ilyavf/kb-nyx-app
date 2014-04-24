(function (define) {
    'use strict';

    define([
        'auth/AuthModule'
    ], function () {

        // See http://docs.angularjs.org/api/ngMock/service/$httpBackend

        describe('Service: currentUser', function () {
            var $httpBackend,
                currentUser,
                loginUrl = 'http://server:1337/api/login',
                profileUrl = 'http://server:1337/api/profile',
                signupUrl = 'http://server:1337/api/signup';

            // load the service's module
            beforeEach(module('Nyx.Auth'));

            beforeEach(inject(function(_currentUser_, $injector) {
                // Set up the mock http service responses
                $httpBackend = $injector.get('$httpBackend');
                // backend definition common for all tests
                // data: {code, message, result}
                $httpBackend.when('POST', loginUrl).respond({code: 200, result: {email: 'ilya.fadeev@clickfree.com'}, message: 'OK'});
                $httpBackend.when('GET', profileUrl).respond({code: 200, result: {name: 'Ilya', userid: '12345'}, message: 'User profile'});
                $httpBackend.when('POST', signupUrl).respond({code: 200, result: {email: 'ilya.fadeev@clickfree.com'}, message: 'OK'});

                currentUser = _currentUser_;
            }));
            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
                currentUser.logout();
            });

            it('should be able to login', inject(function($rootScope) {
                $httpBackend.expectPOST(loginUrl);
                var responsePromise = currentUser.login('user', '123456'),
                    serverResponse = {};
                $httpBackend.flush();
                responsePromise.then(function (result) {
                    serverResponse = result;
                });
                // Resolve promises:
                $rootScope.$apply();

                expect(serverResponse.code).toBe(200);
                expect(currentUser.isLoggedIn()).toBe(true);
            }));

            it('should be able to load user profile', inject(function($rootScope) {
                $httpBackend.expectGET(profileUrl);
                var responsePromise = currentUser.loadProfile(),
                    serverResponse = {};
                $httpBackend.flush();
                responsePromise.then(function (result) {
                    serverResponse = result;
                });
                // Resolve promises:
                $rootScope.$apply();

                expect(serverResponse.name).toBe('Ilya');
                expect(serverResponse.userid).toBe('12345');
                expect(currentUser.isLoggedIn()).toBe(true);
            }));

            it('should be able to signup', inject(function($rootScope) {
                $httpBackend.expectPOST(signupUrl);
                var responsePromise = currentUser.login('user@gmail.com', '123456', 'username'),
                    serverResponse = {};
                $httpBackend.flush();
                responsePromise.then(function (result) {
                    serverResponse = result;
                });
                // Resolve promises:
                $rootScope.$apply();

                expect(serverResponse.code).toBe(200);
                expect(currentUser.isLoggedIn()).toBe(true);
            }));

        });


    });

}(define));
