'use strict';

describe('Service: System_user', function () {

  // load the service's module
  beforeEach(module('dnalivAppApp'));

  // instantiate service
  var Institution;
  beforeEach(inject(function (_System_user_) {
    System_user = _System_user_;
  }));

  it('should do something', function () {
    expect(!!System_user).toBe(true);
  });

});
