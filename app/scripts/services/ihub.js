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
  factory('Item', ['$resource','solrUrl','solrFacet','solrCall',
    function($resource,solrUrl,solrFacet,solrCall) {

     // var solr_url = solrUrl+'collection1/select?q=*%3A*'+solrFacet+'manu'+solrFacet+'cat'+solrCall;
     var solr_url = solrUrl.concat('collection1/select?q=*%3A*',solrFacet,'manu',solrFacet,'cat',solrCall);

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
  ]);
  
