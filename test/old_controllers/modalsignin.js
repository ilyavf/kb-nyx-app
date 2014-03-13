'use strict';

describe('Service: ModalSignIn', function () {

  // load the service's module
  beforeEach(module('nyx.auth'));

  // instantiate service
  var ModalSignIn;
  beforeEach(inject(function (_ModalSignIn_) {
    ModalSignIn = _ModalSignIn_;
  }));

  it('should do something', function () {
    expect(!!ModalSignIn).toBe(true);
  });

});
