'use strict';

/**
 * @ngdoc function
 * @name iHubApp.controller:ItemsCtrl
 * @description
 * # ItemsCtrl
 * Controller of the iHubApp
 */
// Register `phoneList` component, along with its associated controller and template
angular.
  module('itemList').
  component('itemList', {
    templateUrl: 'views/item-list.html',
    controller: ['Item','$log','$scope',
      function ItemListController(Item,$log,$scope) {
        
        this.items = Item.query();
       /*$scope.items = [];
       Item.query().$promise.then(
         function (result) {
           $scope.items = result.response.docs;
           $log.debug('Result : '+ result.response.docs[1].name);
           $log.debug('items : '+$scope.items[1].name);
         },
         function () {
         }
       );*/

        this.orderProp = 'createddate';
        this.facets = [
          {
            name: 'Category',
            num: '2'
          }, {
            name: 'Lifecycle',
            num: '7'
          }, {
            name: 'RoHS(i)',
            num: '3'
          },
          {
            name: 'Risk Rating',
            num: '3'
          }, {
            name: 'Buyer',
            num: '7'
          }, {
            name: 'RoHS(c)',
            num: '3'
          }
        ];        
      }
    ]
  });
