'use strict';

describe('Service: Lokalitet_spot', function () {

  // load the service's module
  beforeEach(module('dnalivAppApp'));

  // instantiate service
  var Institution;
  beforeEach(inject(function (_Lokalitet_spot_) {
    Lokalitet_spot = _Lokalitet_spot_;
  }));

  it('should do something', function () {
    expect(!!Lokalitet_spot).toBe(true);
  });

});
