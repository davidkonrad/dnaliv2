'use strict';

describe('Service: Lokalitet', function () {

  // load the service's module
  beforeEach(module('dnalivAppApp'));

  // instantiate service
  var Institution;
  beforeEach(inject(function (_Lokalitet_) {
    Lokalitet = _Lokalitet_;
  }));

  it('should do something', function () {
    expect(!!Lokalitet).toBe(true);
  });

});
