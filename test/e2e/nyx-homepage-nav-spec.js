/* global: element, by */

describe('Kooboodle Nyx homepage navigation', function() {

    beforeEach(function() {
        browser.get('http://127.0.0.1:9000');
    });

    it('should be able to navigate to About page', function() {
        element(by.css('.nav a[href="#/about"]')).click();
        var activeNavLink = element(by.css('.nav li.active a'));
        expect(activeNavLink.getText()).toEqual('About');
    });

    it('should be able to navigate to Contact page', function() {
        element(by.css('.nav a[href="#/contact"]')).click();
        var activeNavLink = element(by.css('.nav li.active a'));
        expect(activeNavLink.getText()).toEqual('Contact');
    });

    it('should be able to navigate back to Home page', function() {
        element(by.css('.nav a[href="#/about"]')).click();
        var activeNavLink = element(by.css('.nav li.active a'));
        expect(activeNavLink.getText()).toEqual('About');
        element(by.css('.nav a[href="#/"]')).click();
        activeNavLink = element(by.css('.nav li.active a'));
        expect(activeNavLink.getText()).toEqual('Home');
    });
});