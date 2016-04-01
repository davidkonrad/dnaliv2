'use strict';

describe('Service: Resultat_taxon', function () {

  // load the service's module
  beforeEach(module('dnalivApp'));

  // instantiate service
  var Resultat_taxon;
  beforeEach(inject(function (_Resultat_taxon_) {
    Resultat_taxon = _Resultat_taxon_;
  }));

  it('should do something', function () {
    expect(!!Resultat_taxon).toBe(true);
  });

});
