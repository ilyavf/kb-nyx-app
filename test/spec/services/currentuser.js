'use strict';

// See http://docs.angularjs.org/api/ngMock/service/$httpBackend

describe('Service: CurrentUser', function () {
    var $httpBackend,
        CurrentUser;

    // load the service's module
    beforeEach(module('nyxWebApp'));

    beforeEach(inject(function(_CurrentUser_, $injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // backend definition common for all tests
        $httpBackend.when('POST', 'http://testb.kooboodle.com/user/openphoto/login.json').respond({result: true, message: 'OK'});

        CurrentUser = _CurrentUser_;
    }));
    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should be able to login', inject(function($rootScope) {
        console.log('TEST: CurrentUser login');
        $httpBackend.expectPOST('http://testb.kooboodle.com/user/openphoto/login.json');
        var loginPromise = CurrentUser.login('user', '123456'),
            loginResult;
        $httpBackend.flush();
        loginPromise.then(function (result) {
            loginResult = result;
            console.log('TEST: CurrentUser login resolved: ' + loginResult.success + ' ' + loginResult.message);
        });
        // Resolve promises:
        $rootScope.$apply();
        
        expect(loginResult.success).toBe(true);
        expect(loginResult.message).toBe('OK');
    }));

});
