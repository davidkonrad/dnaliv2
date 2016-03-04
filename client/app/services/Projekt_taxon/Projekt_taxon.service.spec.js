'use strict';

describe('Service: Projekt_taxon', function () {

  // load the service's module
  beforeEach(module('dnalivAppApp'));

  // instantiate service
  var Projekt;
  beforeEach(inject(function (_ProjektTaxon_) {
    Projekt_taxon = _ProjektTaxon_;
  }));

  it('should do something', function () {
    expect(!!Projekt_taxon).toBe(true);
  });

});
