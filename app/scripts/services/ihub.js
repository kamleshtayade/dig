'use strict';

/**
 * @ngdoc service
 * @name iHubApp.ihub
 * @description
 * # ihub
 * Service in the iHubApp.
 */
/*
// local json call
angular.
  module('core.item').
  factory('Item', ['$resource','$log',
    function($resource,$log) {
      $log.debug('from Service!');
      var itemSer = $resource('items/:itemId.json', {});
      return $resource('items/:itemId.json', {}, {
        query: {
          method: 'GET',
          params: {itemId: 'items'},
          isArray: true
        }
      });
    }
  ]);
*/
// solr api call
angular.
  module('core.item').
  factory('Item', ['$resource',
    function($resource) {
      var solrurl = 'http://127.0.0.1:8983/solr/collection1/select?q=*%3A*&wt=json&facet.field=manu&facet.field=cat&facet=on&indent=true&callback=JSON_CALLBACK';
      return $resource(solrurl, {}, {
        query: {
          method: 'GET',          
          params: {itemId: 'items'},
          isArray: false,
          transformResponse: function (data) {
                data = angular.fromJson(data);
                return data;
           }
        }
      });
    }
  ]);
  
