'use strict';

/**
 * @ngdoc function
 * @name iHubApp.controller:LandCtrl
 * @description
 * # LandCtrl
 * Controller of the iHubApp
 */
angular.module('iHubApp')
  .controller('LandCtrl',['$log','$scope', function LandController($log,$scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.otherNotes = [
      'phonecat yeoman-ized',
      'Disabled CSS watchers for CDT',
      'EditorConfig',
      'Linting (jsHint & pre-commit hooks)',
      'Continuous Integration',
      'Protractor'
    ];
  }]);
