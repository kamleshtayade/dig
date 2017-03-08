'use strict';

describe('Controller: ItemdetailCtrl', function () {

  // load the controller's module
  beforeEach(module('iHubApp'));

  var ItemdetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItemdetailCtrl = $controller('ItemdetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ItemdetailCtrl.awesomeThings.length).toBe(3);
  });
});
