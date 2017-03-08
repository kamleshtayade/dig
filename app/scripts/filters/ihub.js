'use strict';

/**
 * @ngdoc filter
 * @name iHubApp.filter:ihub
 * @function
 * @description
 * # ihub
 * Filter in the iHubApp.
 */
angular.
  module('core').
  filter('checkmark', function() {
    return function(input) {
      return input ? '\u2713' : '\u2718';
    };
  });
