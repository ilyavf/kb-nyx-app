(function (define) {
    'use strict';

    define([
        'auth/AuthModule'
    ], function () {

        // See http://docs.angularjs.org/api/ngMock/service/$httpBackend

        describe('Service: currentUser', function () {
            var $httpBackend,
                currentUser;

            // load the service's module
            beforeEach(module('Nyx.Auth'));

            beforeEach(inject(function(_currentUser_, $injector) {
                // Set up the mock http service responses
                $httpBackend = $injector.get('$httpBackend');
                // backend definition common for all tests
                // data: {code, message, result}
                $httpBackend.when('POST', 'http://testb.kooboodle.com/user/openphoto/login.json').respond({code: 200, result: {email: 'ilya.fadeev@clickfree.com'}, message: 'OK'});

                currentUser = _currentUser_;
            }));
            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });


            it('should be able to login', inject(function($rootScope) {
                console.log('TEST: currentUser login');
                console.log(typeof currentUser);
                $httpBackend.expectPOST('http://testb.kooboodle.com/user/openphoto/login.json');
                var loginPromise = currentUser.login('user', '123456'),
                    loginResult;
                $httpBackend.flush();
                loginPromise.then(function (result) {
                    loginResult = result;
                    console.log('TEST: currentUser login resolved: ' + result.message);
                });
                // Resolve promises:
                $rootScope.$apply();

                expect(loginResult.code).toBe(200);
                expect(loginResult.message).toBe('OK');
                expect(loginResult.result.email).toBe('ilya.fadeev@clickfree.com');
            }));

        });


    });

}(define));
