'use strict';

/**
 * @ngdoc service
 * @name iHubApp.solrurl
 * @description
 * # solrurl
 * Constant in the iHubApp.
 */
angular.module('iHubApp')
  .constant('solrUrl', 'http://127.0.0.1:8983/solr/')
  .constant('solrFacet', '&facet.field=')
  .constant('solrCall', '&wt=json&facet=on&indent=true&callback=JSON_CALLBACK');
