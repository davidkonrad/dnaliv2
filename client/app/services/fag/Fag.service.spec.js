'use strict';

describe('Service: Fag', function () {

  // load the service's module
  beforeEach(module('dnalivAppApp'));

  // instantiate service
  var Institution;
  beforeEach(inject(function (_Fag_) {
    Fag = _Fag_;
  }));

  it('should do something', function () {
    expect(!!Fag).toBe(true);
  });

});
