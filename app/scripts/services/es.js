'use strict';

/**
 * @ngdoc service
 * @name iHubApp.es
 * @description
 * # es
 * Service in the iHubApp.
 */
angular.module('iHubApp')
  .service('es', function (esFactory) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return esFactory({
        host: 'http://fesesapp-dev-001:9200',
        apiVersion: '2.3',
        log: 'trace'
      });
  });
