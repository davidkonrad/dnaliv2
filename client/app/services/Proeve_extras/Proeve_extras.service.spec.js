'use strict';

describe('Service: Proeve', function () {

  // load the service's module
  beforeEach(module('dnalivAppApp'));

  // instantiate service
  var Proeve;
  beforeEach(inject(function (_Proeve_) {
    Proeve = _Proeve_;
  }));

  it('should do something', function () {
    expect(!!Proeve).toBe(true);
  });

});
