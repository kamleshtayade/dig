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
         },
         function () {
         }
       );

        $scope.orderProp = "item_number";
        
        /*Tree directive */

        $scope.expandAll = expandAll;
        
        $scope.dataCat = CommodityItem(0,"Category");
        var item1 = addChild($scope.dataCat, 1, "PID");
        var item2 = addChild($scope.dataCat, 2, "Non-Commodity");

        $scope.dataLife = CommodityItem(1,"Lifecycle");
        var item11 = addChild($scope.dataLife, 1, "End of Production");
        var item12 = addChild($scope.dataLife, 2, "Production");
        var item13 = addChild($scope.dataLife, 3, "Cancelled");
        var item14 = addChild($scope.dataLife, 4, "End of Support");
        var item15 = addChild($scope.dataLife, 5, "Prototype");
        
        item14.isSelected=true;
        item11.isExpanded = true;
        addChild(item11, 5, "MPN");
        addChild(item11, 6, "CPN");
        addChild(item12, 7, "Commodity Product");
        addChild(item12, 8, "Existing Product");


        function CommodityItem(id, name) {
          return {
            id: id,
            name: name,
            children: [],
            isExpanded: false,
            isSelected: false,
          };
        }
        
        function addChild(parent, id, name) {
          var child = CommodityItem(id, name);
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

        // Define facted

        var uniqueItems = function (data, key) {
          var result = [];
          for (var i = 0; i < data.length; i++) {
            var value = data[i][key];
            if (result.indexOf(value) == -1) {
              result.push(value);
            }
          }
          return result;
        };

        $scope.useBrands = {};
        $scope.filters = {};
        $scope.filters.Label = {};

        $scope.maxBrands = 3;
        $scope.maxLabels = 3;

        $scope.products = [{
          "Brand": "Production",
          "Labels": ["Commodity", "Document"]
        }, {
          "Brand": "Production",
          "Labels": ["Commodity", "Document"]
        }, {
          "Brand": "Production",
          "Labels": ["Commodity", "Document"]
        }, {
          "Brand": "Not Recommended",
          "Labels": ["Commodity", "Document"]
        }, {
          "Brand": "End of Support",
          "Labels": ["Commodity", "Document"]
        }, {
          "Brand": "Restricted Production",
          "Labels": ["Commodity", "Document"]
        }, {
          "Brand": "Cancelled",
          "Labels": ["Commodity", "Document"]
        }, {
          "Brand": "End of Production",
          "Labels": ["Non-Commodity", "Document"]
        }, {
          "Brand": "End of Production",
          "Labels": ["Non-Commodity", "Document"]
        }, {
          "Brand": "Production",
          "Labels": ["Non-Commodity", "Document"]
        }, {
          "Brand": "Prototype",
          "Labels": ["Commodity", "Document"]
        }, {
          "Brand": "Obsolete",
          "Labels": ["Commodity", "Document"]
        },{
          "Brand": "Draft",
          "Labels": ["Commodity", "Document"]
        }
        ];
        $scope.sorting = {
          id: "1",
          order: "Name",
          direction: "false"
        };

        $scope.setOrder = function (id, order, reverse) {
          $scope.sorting.id = id;
          $scope.sorting.order = order;
          $scope.sorting.direction = reverse;
        };

        // Watch the Price that are selected
        $scope.$watch(function () {
          return {
            products: $scope.products,
            useBrands: $scope.useBrands,
          }
        }, function (value) {
          var selected;

          $scope.count = function (prop, value) {
            return function (el) {
              return el[prop] == value;
            };
          };

          $scope.brandsGroup = uniqueItems($scope.products, 'Brand');
          var filterAfterBrands = [];
          selected = false;
          for (var j in $scope.products) {
            var p = $scope.products[j];
            for (var i in $scope.useBrands) {
              if ($scope.useBrands[i]) {
                selected = true;
                if (i === p.Brand) {
                  filterAfterBrands.push(p);
                  break;
                }
              }
            }
          }
          if (!selected) {
            filterAfterBrands = $scope.products;
          }

          $scope.filteredProducts = filterAfterBrands;
        }, true);

        $scope.$watch('filtered', function (CommodityValue) {
          if (angular.isArray(CommodityValue)) {
            console.log(CommodityValue.length);
          }
        }, true);



        // end Define facted        
      }
    ]
  });
