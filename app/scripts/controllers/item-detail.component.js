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
    controller: ['$routeParams', 'Item','$log','$scope','es','esFactory','$resource','$http','$cookies','$cookieStore','$timeout',
      function ItemDetailController($routeParams,Item,$log,$scope,es,esFactory,$resource,$http,$cookies,$cookieStore,$timeout) {   
        $scope.isCollapsed = true;
        $scope.item=[];
        $scope.solrQuery = 'id:'+$routeParams.id; // Here we can modify search parameter
        $scope.itemNo = $routeParams.id;

        $scope.favCo = $cookies.getAll();
        $log.debug("All Cookies key "+JSON.stringify($scope.favCo));
        
       Item.get({q: $scope.solrQuery}).$promise.then(
         function (result) {
           $scope.item = result.response.docs;
           $scope.setImage("items/images/34-2467-02_gr.PNG");
          // $log.debug('item : '+$scope.item[0].item_number);
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
            imgpath: 'items/images/34-2615-01_gr.PNG',
            revision:'-A0',
            lifecycle:'Production',
            cost:'1',
            description:'PWRSPLY-DC/DC,8.0-13.8VIN,0',
            riskrating:'1'
          }, {
            name: '34-2467-02',
            imgpath: 'items/images/34-2467-02_gr.PNG',
            revision:'-A0',
            lifecycle:'Production',
            cost:'1',
            description:'PWRSPLY-DC/DC,8.0-13.8VIN,0',
            riskrating:'1'
          }, {
            name: '341-0623-01',
            imgpath: 'items/images/341-0623-01_gr.PNG',
            revision:'-A0',
            lifecycle:'Production',
            cost:'1',
            description:'PWRSPLY-DC/DC,8.0-13.8VIN,0',
            riskrating:'1'
          },
          {
            name: '34-2615-01',
            imgpath: 'items/images/34-2615-01_gr.PNG',
            revision:'-A0',
            lifecycle:'Production',
            cost:'1',
            description:'PWRSPLY-DC/DC,8.0-13.8VIN,0',
            riskrating:'1'
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
              "query": { "match_phrase": { "item_number": $routeParams.id } }
            }
          }).then(function (response) {
            $scope.hits = response.hits.hits;
          });

          // Alternate CPN 11-100359-01
          $scope.altrCPN = [];
          $scope.altrCPNs = [];
          var apiUrl = 'http://pdaf-api-dev.cisco.com/pdafapp/bom/1.0/cpn/getAlternateCPNs?cpns='+$routeParams.id;         
          
          $resource(apiUrl).query( function (data) {
            $scope.altrCPN = angular.fromJson(data);            
            $log.debug("altrCPN"+$scope.altrCPN);
            $scope.alterCPNItem = $scope.altrCPN[0].ITEM_NUMBER;
            $scope.altrCPNs = $scope.altrCPN[0].ALTERNATE_CPNS;           
            
          });
          // Alternate API End

          // search for AVL
          es.search({
            index: 'dmavllistmpnmv',
            size: 50,
            body: {
              "query": { "match_phrase": { "manufacturer_part_no": $routeParams.id } }
            }
          }).then(function (response) {
            $scope.avlhits = response.hits.hits;
          });

           // search for MCN
          es.search({
            index: 'ccmccnciscopartdetails',
            size: 50,
            body: {
              "query": { "match_phrase": { "current_item_no": $routeParams.id } }
            }
          }).then(function (response) {
            $scope.mcnhits = response.hits.hits;
          });

          // rating start
          $scope.rating = 0;
		      $scope.ratings = 5;
		      $scope.comment = [];
          $scope.average_rating = 2;
          $scope.totalusers = 1;
          $scope.max = 5;
          $scope.isReadonly = false;

          function getRating() {
            var xmlhttp = new XMLHttpRequest();
            var response;
            xmlhttp.open("GET", "https://mdx-stg.cisco.com/mdx/emp/supplychain/testid1_01.json");
            xmlhttp.withCredentials = true;
            xmlhttp.send();

            xmlhttp.onreadystatechange = function () {
              if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 401)) {
                var jsoncomment = JSON.parse(xmlhttp.responseText);
                $scope.ratingsdata = jsoncomment;
                $scope.showcomments = true;
                $scope.average_rating = $scope.ratingsdata.average_rating;
                $scope.totalusers = $scope.ratingsdata.total_count;
                $log.debug("Show Comments "+$scope.average_rating);
                $scope.$apply();
              }
            }

          }

          getRating(); //get previous ratings

          $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
          };
	      
          // put ratings
          $scope.getSelectedRating = function (value) {
            $log.debug("Selected Ratings "+value);
            $scope.rating = value;
          }

          // rating end

          // Multi-Carousel
          var owlAPi;
          $scope.items = [1, 2, 3, 4, 5, 6, 7, 8];

          $scope.properties = {
            items: 3,
            onChange: function () {
              // console.dir(arguments);
            },
            animateIn: 'fadeIn',
            lazyLoad: true,
            margin: 10,
            nav:true
          };

          $scope.ready = function ($api) {
            owlAPi = $api;
          };

          $timeout(function () {
            //console.dir(owlAPi);
            owlAPi.trigger('next.owl.carousel', [2000]);
          }, 2000)

      }// ItemDetailController
    ]
  });