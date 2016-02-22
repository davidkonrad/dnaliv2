'use strict';

describe('Service: Test', function () {

  // load the service's module
  beforeEach(module('dnalivAppApp'));

  // instantiate service
  var Test;
  beforeEach(inject(function (_Test_) {
    Test = _Testr_;
  }));

  it('should do something', function () {
    expect(!!Test).toBe(true);
  });

});
