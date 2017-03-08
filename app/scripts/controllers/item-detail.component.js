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
    controller: ['$routeParams', 'Item',
      function ItemDetailController($routeParams, Item) {
        var self = this;
        self.item = Item.get({itemId: $routeParams.itemId}, function(item) {
          self.setImage(item.images[0]);
        });

        self.setImage = function setImage(imageUrl) {
          self.mainImageUrl = imageUrl;
        };
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