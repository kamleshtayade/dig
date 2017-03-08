'use strict';

describe('Service: ihub', function () {

  // load the service's module
  beforeEach(module('iHubApp'));

  // instantiate service
  var ihub;
  beforeEach(inject(function (_ihub_) {
    ihub = _ihub_;
  }));

  it('should do something', function () {
    expect(!!ihub).toBe(true);
  });

});
