'use strict';

describe('Service: Klassetrin', function () {

  // load the service's module
  beforeEach(module('dnalivAppApp'));

  // instantiate service
  var Institution;
  beforeEach(inject(function (_Klassetrin_) {
    Klassetrin = _Klassetrin_;
  }));

  it('should do something', function () {
    expect(!!Klassetrin).toBe(true);
  });

});
