'use strict';

describe('Service: GeologicTimePeriod', function () {

  // load the service's module
  beforeEach(module('dnalivApp'));

  // instantiate service
  var Taxon;
  beforeEach(inject(function (_GeologicTimePeriod_) {
    GeologicTimePeriod = _GeologicTimePeriod_;
  }));

  it('should do something', function () {
    expect(!!GeologicTimePeriod).toBe(true);
  });

});
