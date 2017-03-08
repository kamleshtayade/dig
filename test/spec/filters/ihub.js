'use strict';

describe('Filter: ihub', function () {

  // load the filter's module
  beforeEach(module('iHubFilters'));

  // initialize a new instance of the filter before each test
  var ihub;
  beforeEach(inject(function ($filter) {
    ihub = $filter('ihub');
  }));

  it('should return the input prefixed with "ihub filter:"', function () {
    var text = 'angularjs';
    expect(ihub(text)).toBe('ihub filter: ' + text);
  });

  it('should convert boolean values to unicode checkmark or cross',
    inject(function(checkmarkFilter) {
      expect(checkmarkFilter(true)).toBe('\u2713');
      expect(checkmarkFilter(false)).toBe('\u2718');
    })
  );

});
