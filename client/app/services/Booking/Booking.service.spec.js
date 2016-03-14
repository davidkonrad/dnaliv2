'use strict';

describe('Service: Booking', function () {

  // load the service's module
  beforeEach(module('dnalivAppApp'));

  // instantiate service
  var Booking;
  beforeEach(inject(function (_Booking_) {
    Booking = _Booking_;
  }));

  it('should do something', function () {
    expect(!!Booking).toBe(true);
  });

});
