'use strict';

describe('Service: Booking_taxon', function () {

  // load the service's module
  beforeEach(module('dnalivAppApp'));

  // instantiate service
  var Projekt;
  beforeEach(inject(function (_BookingTaxon_) {
    Projekt_taxon = _BookingTaxon_;
  }));

  it('should do something', function () {
    expect(!!Projekt_taxon).toBe(true);
  });

});
