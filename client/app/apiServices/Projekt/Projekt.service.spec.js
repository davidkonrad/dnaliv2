'use strict';

describe('Service: Projekt', function () {

  // load the service's module
  beforeEach(module('dnalivAppApp'));

  // instantiate service
  var Projekt;
  beforeEach(inject(function (_Projekt_) {
    Projekt = _Projekt_;
  }));

  it('should do something', function () {
    expect(!!Projekt).toBe(true);
  });

});
