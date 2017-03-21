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
    controller: ['$routeParams', 'Item','$log','$scope','es','esFactory',
      function ItemDetailController($routeParams,Item,$log,$scope,es,esFactory) {   
        $scope.item=[];
        $scope.solrQuery = 'id:'+$routeParams.id; // Here we can modify search parameter
        
       Item.get({q: $scope.solrQuery}).$promise.then(
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

        //Elastic cluster status
        es.cluster.state({
          metric: [
            'cluster_name',
            'nodes',
            'master_node',
            'version'
          ]
        })
          .then(function (resp) {
            $scope.clusterState = resp;
            $scope.error = null;
          })
          .catch(function (err) {
            $scope.clusterState = null;
            $scope.error = err;
            // if the err is a NoConnections error, then the client was not able to
            // connect to elasticsearch. In that case, create a more detailed error
            // message
            if (err instanceof esFactory.errors.NoConnections) {
              $scope.error = new Error('Unable to connect to elasticsearch. ' +
                'Make sure that it is running and listening at http://localhost:9200');
            }
          });
          // Elastic search
          // search for documents
          es.search({
            index: 'dmitemmastermv',
            size: 50,
            body: {
              "query": { "match_phrase": { "id": $routeParams.id } }
            }
          }).then(function (response) {
            $scope.hits = response.hits.hits;
          });

      }// ItemDetailController
    ]
  });