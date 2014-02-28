'use strict';

describe('Service: CurrentUser', function () {

  // load the service's module
  beforeEach(module('nyxWebApp'));

  // instantiate service
  var CurrentUser;
  beforeEach(inject(function (_CurrentUser_) {
    CurrentUser = _CurrentUser_;
  }));

  it('should be able to login', function () {
    var loginResult = CurrentUser.login('user', '123456');
    loginResult.then(function (result) {
        expect(result.success).toBe(true);
    });
  });

});
