/* global: element, by */

describe('Kooboodle Nyx login/signup', function() {

    describe('- login', function() {
        var url = 'http://127.0.0.1:9000/#/';

        beforeEach(function() {
            browser.get(url);
        });

        it('should not be able to login with wrong credentials', function() {
            element(by.css('a.btn-login-modal')).click();
            element(by.model('user.email')).sendKeys('user@clickfree.com');
            element(by.model('user.password')).sendKeys('12345');
            element(by.css('button.btn-signin')).click();

            var loginMessage = element(by.css('.login-result'));
            expect(browser.getCurrentUrl()).toEqual(url);
            expect(loginMessage.getText()).toEqual('User was not able to be logged in');
        });

        it('should be able to login', function() {
            element(by.css('a.btn-login-modal')).click();
            element(by.model('user.email')).sendKeys('ilya.fadeev@clickfree.com');
            element(by.model('user.password')).sendKeys('123456');
            element(by.css('button.btn-signin')).click();

            expect(browser.getCurrentUrl()).toEqual(url + 'auth');

            //Logout:
            element(by.css('.btn-logout-modal')).click();
            element(by.css('.btn-logout')).click();
            expect(element(by.css('.btn-logout-modal')).isPresent()).toBe(false);
        });
    });

    describe('- sign up', function() {

        var url = 'http://127.0.0.1:9000/#/signup-hidden';

        beforeEach(function() {
            browser.get(url);
        });

        it('should validate name field', function() {
            browser.wait(function () {
                return $('#sign-in-modal').isDisplayed();
            }, 1000, 'modal timeout').then(function () {

                    element(by.model('user.name')).sendKeys('use');
                    element(by.model('user.email')).sendKeys('user@gmail.com');
                    element(by.model('user.password')).sendKeys('123456');
                    var button = element(by.css('button.btn-signin'));
                    expect(button.isEnabled()).toEqual(false);
            });
        });

        it('should pass validation with correct fields', function() {
            browser.wait(function () {
                return $('#sign-in-modal').isDisplayed();
            }, 1000, 'modal timeout').then(function () {

                    element(by.model('user.name')).sendKeys('user');
                    element(by.model('user.email')).sendKeys('user@gmail.com');
                    element(by.model('user.password')).sendKeys('123456');
                    var button = element(by.css('button.btn-signin'));
                    expect(button.isEnabled()).toEqual(true);
                });
        });

    });

});

//// Protractor Tests without a Backend (or how to mock a backend)
//// https://github.com/angular/protractor/issues/125
//
//// Mocking backend api:
//exports.httpBackendMock = function() {
//    angular.module('httpBackendMock', ['mainApp', 'ngMockE2E'])
//        .run(function($httpBackend) {
//            console.log('Test platform bootstrapping');
//            ...
//            $httpBackend.whenGET('/events').respond([sampleEvent]);
//            $httpBackend.whenGET('/events/' + sampleEventId).respond(sampleEvent);
//            $httpBackend.whenGET('/login').passThrough();
//            $httpBackend.whenGET(/partials\/.*/).passThrough();
//            $httpBackend.whenPOST('/events').respond(function(method, url, data) {
//                data._id = 123456789;
//                return [200, angular.toJson(data), {}];
//            });
//            $httpBackend.whenDELETE('/events/' + sampleEventId).respond(function(method, url, data) {
//                return [200, {
//                    delete: sampleEvent
//                }, {}];
//            });
//            console.log('Test platform bootstrapping ... done');
//        });
//}
//
//// In protractor scenario file:
//var mockModule = require('./mocked-backend');
//beforeEach(function() {
//    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
//});
