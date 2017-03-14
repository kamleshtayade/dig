'use strict';

describe('Controller: LandCtrl', function () {

  // load the controller's module
  beforeEach(module('iHubApp'));

  var LandCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LandCtrl = $controller('LandCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LandCtrl.awesomeThings.length).toBe(3);
  });
});
