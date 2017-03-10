'use strict';

describe('Service: constant', function () {

  // load the service's module
  beforeEach(module('iHubApp'));

  // instantiate service
  var solrUrl;
  beforeEach(inject(function (_solrUrl_) {
    solrUrl = _solrUrl_;
  }));

  it('should do something', function () {
    expect(!!solrUrl).toBe(true);
  });

});