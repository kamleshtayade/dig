'use strict';

/**
 * @ngdoc function
 * @name iHubApp.controller:ItemdetailCtrl
 * @description
 * # ItemdetailCtrl
 * Controller of the iHubApp
 */
angular.
  module('itemDetail').
  component('itemDetail', {
    templateUrl: 'views/item-detail.html',
    controller: ['$routeParams', 'Item','$log','$scope',
      function ItemDetailController($routeParams,Item,$log,$scope) {   
        $scope.item=[];

        /*$scope.item = Item.get({itemId: $routeParams.itemId}, function(item) {
          $scope.setImage(item.images[0]);
        });*/
        
       Item.query().$promise.then(
         function (result) {
           $scope.item = result.response.docs;
           $scope.setImage("items/images/34-2467-02_gr.PNG");
           $log.debug('item : '+$scope.item[0].item_number);
         },
         function () {
         }
       );

        $scope.setImage = function setImage(imageUrl) {
          $scope.mainImageUrl = imageUrl;
        };

        $scope.itemImg =  [
        "items/images/34-2615-01_gr.PNG",
        "items/images/34-2615-01_ch.PNG",
        "items/images/34-2615-01_fp.PNG",
        "items/images/34-2615-01_sch.PNG"
        ];

        this.freqs = [
          {
            name: '34-2615-01',
            imgpath: 'items/images/34-2615-01_gr.PNG'
          }, {
            name: '34-2467-02',
            imgpath: 'items/images/34-2467-02_gr.PNG'
          }, {
            name: '341-0623-01',
            imgpath: 'items/images/341-0623-01_gr.PNG'
          },
          {
            name: '34-2615-01',
            imgpath: 'items/images/34-2615-01_gr.PNG'
          }
        ];
        this.itemByCats = [
           {
            name: '341-0623-01',
            imgpath: 'items/images/341-0623-01_gr.PNG'
          },{
            name: '34-2615-01',
            imgpath: 'items/images/34-2615-01_gr.PNG'
          },
          {
            name: '34-2615-01',
            imgpath: 'items/images/34-2615-01_gr.PNG'
          },
          {
            name: '34-2467-02',
            imgpath: 'items/images/34-2467-02_gr.PNG'
          }
        ];
      }
    ]
  });