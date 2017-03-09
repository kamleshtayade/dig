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
    controller: ['Items','$log','$scope',
      function ItemListController(Items,$log,$scope) {
        
       // this.items = Item.query();
       $scope.items = [];
       $scope.classcode = "";
       $scope.imageUrl = "";
       $scope.facets = [];
       Items.query().$promise.then(
         function (result) {
           $scope.items = result.response.docs;
          // $log.debug('Result : '+ result.response.docs[1].item);
           $log.debug('items : '+$scope.items[1].item);
           $scope.classcode = $scope.items.item.substr(2);
           $scope.imageUrl =$scope.classcode.split('-')[0];
           $log.debug('classcode : '+$scope.classcode +":ImageUrl:"+$scope.imageUrl);
         },
         function () {
         }
       );

       Items.query().$promise.then(
         function (result) {
           $scope.facets = result.facet_counts.facet_fields;
          // $log.debug('Result : '+ result.response.docs[1].item);
           $log.debug('facets : '+angular.toJson($scope.facets.revision, true));
         },
         function () {
         }
       );

        this.orderProp = 'createddate';
        /*this.facets = [
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
        ]; */       
      }
    ]
  });
