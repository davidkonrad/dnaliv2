'use strict';

describe('Service: Resultat_item', function () {

  // load the service's module
  beforeEach(module('dnalivApp'));

  // instantiate service
  var Resultat_item;
  beforeEach(inject(function (_Resultat_item_) {
    Resultat_item = _Resultat_item_;
  }));

  it('should do something', function () {
    expect(!!Resultat_item).toBe(true);
  });

});
