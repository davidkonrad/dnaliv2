'use strict';

describe('Service: WorkbenchTemplatesFactory', function () {

  // load the service's module
  beforeEach(module('dnalivAppApp'));

  // instantiate service
  var WorkbenchTemplatesFactory;
  beforeEach(inject(function (_WorkbenchTemplatesFactory_) {
    WorkbenchTemplatesFactory = _WorkbenchTemplatesFactory_;
  }));

  it('should do something', function () {
    expect(!!WorkbenchTemplatesFactory).toBe(true);
  });

});
