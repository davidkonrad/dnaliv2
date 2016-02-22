'use strict';

describe('Service: DataModels', function () {

  // load the service's module
  beforeEach(module('dnalivApp'));

  // instantiate service
  var datamodelsfactory;
  beforeEach(inject(function (_datamodels_) {
    datamodelsfactory = _datamodelsfactory_;
  }));

  it('should do something', function () {
    expect(!!workbenchrowsfactory).toBe(true);
  });

});
