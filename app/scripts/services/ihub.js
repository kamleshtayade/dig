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
  module('core.item')
  .factory('Items', ['$resource','solrUrl','solrFacet','solrCall','$log',
    function($resource,solrUrl,solrFacet,solrCall,$log) {     
     var solr_url = solrUrl.concat('ihub2/select?&rows=30&start=0',solrFacet,'item_lifecycle',solrFacet,'item_category',solrCall,'&q=*%3A*');

     //$log.debug("solr_url:Items "+solr_url);
      return $resource(solr_url, {}, {
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
  ])
  .factory('Item', ['$resource','solrUrl','solrFacet','solrCall','$log',
    function($resource,solrUrl,solrFacet,solrCall,$log) {    
       
     var solr_url = solrUrl.concat('ihub2/select?',solrFacet,'item_lifecycle',solrFacet,'item_category',solrCall);
     
     //$log.debug("solr_url:Item "+solr_url);
      return $resource(solr_url, {id: '@id'}, {
        query: {
          method: 'GET',          
          params: {id: '@id'},
          isArray: false,
          transformResponse: function (data) {
                data = angular.fromJson(data);
                return data;
           }
        }
      });
    }
  ]);
  
