/* global: element, by */

describe('Kooboodle Nyx login/logout', function() {

    beforeEach(function() {
        browser.get('http://127.0.0.1:9000');
    });

    it('should not be able to login with wrong credentials', function() {
        element(by.css('a.btn-login-modal')).click();
        element(by.model('user.name')).sendKeys('user@clickfree.com');
        element(by.model('user.password')).sendKeys('12345');
        element(by.css('button.btn-signin')).click();

        var loginMessage = element(by.css('.login-result'));
        expect(loginMessage.getText()).toEqual('User was not able to be logged in');
    });

});