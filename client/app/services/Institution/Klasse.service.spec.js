'use strict';

describe('Service: Klasse', function () {

  // load the service's module
  beforeEach(module('dnalivAppApp'));

  // instantiate service
  var Institution;
  beforeEach(inject(function (_Klasse_) {
    Klasse = _Klasse_;
  }));

  it('should do something', function () {
    expect(!!Klasse).toBe(true);
  });

});
