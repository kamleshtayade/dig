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
           $log.debug('items : '+$scope.items[1].item_number);
           //$scope.classcode = $scope.items[1].item_number.substr(2);
           //$scope.imageUrl =$scope.classcode.split('-')[0];
           //$log.debug('classcode : '+$scope.classcode +":ImageUrl:"+$scope.imageUrl);
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
        /*Tree directive */

        $scope.expandAll = expandAll;
        
        $scope.dataCat = newItem(0,"Category");
        var item1 = addChild($scope.dataCat, 1, "PID");
        var item2 = addChild($scope.dataCat, 2, "Non-Commodity");

        $scope.dataLife = newItem(1,"Lifecycle");
        var item11 = addChild($scope.dataLife, 1, "End of Production");
        var item12 = addChild($scope.dataLife, 2, "Production");
        var item13 = addChild($scope.dataLife, 3, "Cancelled");
        var item14 = addChild($scope.dataLife, 4, "End of Support");
        var item15 = addChild($scope.dataLife, 5, "Prototype");
        
        item14.isSelected=true;
        item11.isExpanded = true;
        addChild(item11, 5, "MPN");
        addChild(item11, 6, "CPN");
        addChild(item12, 7, "New Product");
        addChild(item12, 8, "Existing Product");


        function newItem(id, name) {
          return {
            id: id,
            name: name,
            children: [],
            isExpanded: false,
            isSelected: false,
          };
        }
        
        function addChild(parent, id, name) {
          var child = newItem(id, name);
          child.parent = parent;
          parent.children.push(child);
          return child;
        }

        function expandAll(root, setting){
          if(! setting){
            setting = ! root.isExpanded;
          }
          root.isExpanded = setting;
          root.children.forEach(function(branch){
            expandAll(branch, setting);
          });
        }        
      }
    ]
  });
