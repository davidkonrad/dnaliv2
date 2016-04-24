'use strict';

describe('Service: Kommentar', function () {

  // load the service's module
  beforeEach(module('dnalivApp'));

  // instantiate service
  var Kommentar;
  beforeEach(inject(function (_Kommentar_) {
    Kommentar = _Kommentar_;
  }));

  it('should do something', function () {
    expect(!!Kommentar).toBe(true);
  });

});
