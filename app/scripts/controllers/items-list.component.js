'use strict';

/**
 * @ngdoc function
 * @name iHubApp.controller:ItemsCtrl
 * @description
 * # ItemsCtrl
 * Controller of the iHubApp
 */
// Register `itemList` component, along with its associated controller and template
angular.
  module('itemList').
  component('itemList', {
    templateUrl: 'views/item-list.html',
    controller: ['Items','$log','$scope','$routeParams','es','esFactory','euiHost',
      function ItemListController(Items,$log,$scope,$routeParams,es,esFactory,euiHost) {
       $scope.items = [];
       $scope.classcode = "";
       $scope.imageUrl = "";
       $scope.facets = [];
       $scope.filteredProducts = [];
       $scope.filteredSiliconProducts=[];

          // Elastic search
          // search for documents
          es.search({
            index: 'itemmastercost',
            size: 100,
            body: {
              "query": {
                "bool": {
                  "must": [
                    {
                      "match": { "item_subclass": { "query": $routeParams.search, "operator": "and" } }
                    },
                    {
                      "fuzzy": { "numeric31": { "value": 400, "fuzziness": 50 } }
                    }
                  ]
                }
              },
              "sort": [{ "item_cost": "desc", "risk_rating": "desc" }],
              "aggregations": {
                "risk_ratings": { "terms": { "field": "risk_rating" } },
                "control_codes": { "terms": { "field": "control_code" } }
              }
            }
          }).then(function (response) {
            $scope.hits = angular.fromJson(response.hits.hits);
            $scope.agRiskR = angular.fromJson(response.aggregations.risk_ratings.buckets);
            $scope.agCntCo = angular.fromJson(response.aggregations.control_codes.buckets);
          });

          /* working for all - full text (if) 
          es.search({
            index: 'itemmastercost',
            size: 10,
            body: {
              "query": { "match_phrase": { "_all": $routeParams.search } },
              "aggregations":{
                "risk_rating":{"terms":{"field":"risk_rating"}},
                "control_code":{"terms":{"field":"control_code"}}
              }
            }
          }).then(function (response) {
           // $scope.hits = response.hits.hits;
           $scope.hits = angular.fromJson(response.hits.hits);
           //$scope.filteredProducts = $scope.hits;
           $scope.agRiskR = angular.fromJson(response.aggregations.risk_rating.buckets);  
           $scope.agCntCo = angular.fromJson(response.aggregations.control_code.buckets);          
          });
          */
          // Elastic Search
          

      /* Items.query().$promise.then(
         function (result) {
           $scope.items = result.response.docs;
           //$log.debug('items : '+$scope.items[1].item_number);
           $scope.filteredProducts = $scope.items; //facted filter
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
       );*/

        $scope.orderProp = "item_number";
        /* filteredSiliconProducts */

        $scope.filteredSiliconProducts = [{
        "part":"BCM5241A1KMLG",
        "supplier":"Broadcom",
        "sellers":"Avnet,Mouser Electronics",
        "cost":"$21"},{
        "part":"BCM5241A1KMLG_2",
        "supplier":"Broadcom",
        "sellers":"Digi-Key,RS Components,EBV Elektronik",
        "cost":"$22"},{
        "part":"BCM5241A1KMLG",
        "supplier":"Broadcom",
        "sellers":"Avnet,Mouser Electronics",
        "cost":"$20"},{
        "part":"BCM5241A1KMLG_3",
        "supplier":"Broadcom",
        "sellers":"Alltek Technology Corporation",
        "cost":"$25"}];

        /*Tree directive */
        $scope.expandAll = expandAll;
        
        $scope.dataCat = CommodityItem(0,"Category");
        var item1 = addChild($scope.dataCat, 1, "Commodity");
        var item2 = addChild($scope.dataCat, 2, "Non-Commodity");

        $scope.dataLife = CommodityItem(1,"Lifecycle");
        var item11 = addChild($scope.dataLife, 1, "Production");
        var item12 = addChild($scope.dataLife, 2, "End of Production");
        var item13 = addChild($scope.dataLife, 3, "Cancelled");
        var item14 = addChild($scope.dataLife, 4, "Prototype");
        var item15 = addChild($scope.dataLife, 5, "Obsolete");
        
       /*  item14.isSelected=true;
        item11.isExpanded = true;
       addChild(item12, 5, "End of Production");
        addChild(item12, 6, "End of Support");*/


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
            var value = data[i]['_source'][key];
            if (result.indexOf(value) == -1) {
              result.push(value);
            }
          }
          return result;
        };

        $scope.useBrands = {};
        $scope.useLabels={};
        $scope.filters = {};
        $scope.filters.Label = {};

        $scope.maxBrands = 3;
        $scope.maxLabels = 3;

        $scope.products = [
          {
            "_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["08-0864-03"],
        "commodity_code":["SEMICONDUCTOR_ASICS_STANDARD CELL_0.065"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129886278",
        "item_lifecycle":"Production",
        "risk_comment":["DPOLITI.1/26/2017:ASIC HAS MET MANUFACTURING LIFE REQUIREMENT (7 YEARS).  DO NOT USE FOR NPI.  CONTACT SUCM with QUESTIONS."],
        "item_subclass":["08-ASIC"],
        "risk_rating":["1"],
        "requesting_bu":["TBABU"],
        "item_description":["ASIC,CARMEL,FCLBGA1152,35X35MM PKG SIZE,1mmPITCH,STDCELL,V2.0"],
        "rohsc":["Pass"],
        "risk_reason_code":["E: Legacy technology or projected to go EOL, not for NPI"],
        "rohsi":["Pass"],
        "_version_":1561492601540968448}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["08-0870-04"],
        "commodity_code":["SEMICONDUCTOR_ASICS_STANDARD CELL_0.065"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129909629",
        "item_lifecycle":"Production",
        "risk_comment":["Exception: 09/27/2016 HELTSAI:JONPENA.12/15/2015:: TI ASIC NOT TO BE DESIGNED INTO NEW PROGRAMS. NO EXCEPTIONS."],
        "item_subclass":["08-ASIC"],
        "risk_rating":["X"],
        "requesting_bu":["TBABU"],
        "item_description":["ASIC,SERENO-D,FCBGA784,0to70'C,1mmPitch,C-TEMP,STDCELL"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601598640128}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["08-0871-02"],
        "commodity_code":["SEMICONDUCTOR_ASICS_STANDARD CELL_0.065"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129958490",
        "item_lifecycle":"Production",
        "risk_comment":["AUTOUPDATED.02/05/2017: Strategy=Single/1/PSL (P LD L) - Meets Strategy - Current PSL Q / NonPSL Q / PSL IPQ / NonPSL IPQ Sources=1/0/0/0"],
        "item_subclass":["08-ASIC"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["ASIC,WOODSIDE PR02,SLC1152,STDCELL"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601602834432}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["08-0875-02"],
        "commodity_code":["SEMICONDUCTOR_ASICS_STANDARD CELL_0.090"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129890253",
        "item_lifecycle":"Production",
        "risk_comment":["09/27/2016:  Strategy=Single/1/PSL (P LD L) - Meets Strategy - Current PSL Q / NonPSL Q / PSL IPQ / NonPSL IPQ Sources=1/0/0/0"],
        "item_subclass":["08-ASIC"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["IC,STDCELL,SUNNYVALE,90nm,Organic BGA2397,Pb-free,C-TEMP (0 to 70'C)"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601608077312}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["11-1770-02"],
        "commodity_code":["E/M_PASSIVE_CAPACITOR_CERAMIC"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129962064",
        "item_lifecycle":"Production",
        "risk_comment":["AUTOUPDATED: 10/15/2015 . Strategy=Multi/2/PSL (P LD L) - Meets Strategy - Current PSL Q / NonPSL Q / PSL IPQ / NonPSL IPQ Sources=7/1/0/0"],
        "item_subclass":["11-Capacitor"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["CAP,CE,1nF,50V,X7R,10%,SM,0402in,Pb-FREE"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601612271616}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["11-1781-02"],
        "commodity_code":["E/M_PASSIVE_CAPACITOR_CERAMIC"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129807684",
        "item_lifecycle":"Production",
        "risk_comment":["ANGUHA.01/02/2017:TOLERANCE IS NON-STD. USE 5% TOLERANCE FOR NPO AND 10% FOR X5R/X7R INSTEAD WHEN POSSIBLE. USE 11-3462-01"],
        "item_subclass":["11-Capacitor"],
        "risk_rating":["1"],
        "requesting_bu":["TBABU"],
        "item_description":["CAP,CE,47nF,16V,X7R,20%,SM,0402in,Pb-FREE"],
        "rohsc":["Pass"],
        "risk_reason_code":["G: Alternative recommended for NPI, see comments"],
        "rohsi":["Pass"],
        "_version_":1561492601631145984}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["11-2330-02"],
        "commodity_code":["E/M_PASSIVE_CAPACITOR_CERAMIC"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129816297",
        "item_lifecycle":"Production",
        "risk_comment":["AUTOUPDATED: 10/15/2015 . Strategy=Multi/2/PSL (P LD L) - Meets Strategy - Current PSL Q / NonPSL Q / PSL IPQ / NonPSL IPQ Sources=5/1/0/0"],
        "item_subclass":["11-Capacitor"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["CAP,CE, .1uF, 10V,10%,SM,0402in,X5R, Pb-free"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601643728896}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["11-2518-01"],
        "commodity_code":["E/M_PASSIVE_CAPACITOR_CERAMIC"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129810912",
        "item_lifecycle":"Production",
        "risk_comment":["AUTOUPDATED.07/23/2016: Strategy=Multi/2/PSL (P LD L) - Meets Strategy - Current PSL Q / NonPSL Q / PSL IPQ / NonPSL IPQ Sources=3/0/0/0"],
        "item_subclass":["11-Capacitor"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["CAP,CE,1.2nF,50V,X7R,10%,SM,0603in"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601652117504}},
      {
        "_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["12-1434-02"],
        "commodity_code":["E/M_PASSIVE_RESISTOR_THICK FILM"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129857786",
        "item_lifecycle":"Production",
        "risk_comment":["AUTOUPDATED.09/29/2013: STRATEGY=MULTI/2/PSL (P LD L) - MEETS STRATEGY - CURRENT PSL Q / NONPSL Q / PSL IPQ / NONPSL IPQ SOURCES=3/1/0/0"],
        "item_subclass":["12-Resistor"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["RES,TKF,4.99 k ohm,0.1W,1%,SM,0603,Pb-FREE"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601656311808}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["12-2209-02"],
        "commodity_code":["E/M_PASSIVE_RESISTOR_THICK FILM"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129875707",
        "item_lifecycle":"Production",
        "risk_comment":["AUTOUPDATED.09/29/2013: STRATEGY=MULTI/2/PSL (P LD L) - MEETS STRATEGY - CURRENT PSL Q / NONPSL Q / PSL IPQ / NONPSL IPQ SOURCES=3/1/0/0"],
        "item_subclass":["12-Resistor"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["RES,TKF,10 ohm,0.063W,1%,SM,0402,Pb-FREE"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601659457536}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["12-2210-02"],
        "commodity_code":["E/M_PASSIVE_RESISTOR_THICK FILM"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129870095",
        "item_lifecycle":"Production",
        "risk_comment":["AUTOUPDATED.09/29/2013: STRATEGY=MULTI/2/PSL (P LD L) - MEETS STRATEGY - CURRENT PSL Q / NONPSL Q / PSL IPQ / NONPSL IPQ SOURCES=4/1/0/0"],
        "item_subclass":["12-Resistor"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["RES,TKF,56.2 ohm,0.063W,1%,SM,0402"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601667846144}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["12-2214-02"],
        "commodity_code":["E/M_PASSIVE_RESISTOR_THICK FILM"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129848371",
        "item_lifecycle":"Production",
        "risk_comment":["AUTOUPDATED.09/29/2013: STRATEGY=MULTI/2/PSL (P LD L) - MEETS STRATEGY - CURRENT PSL Q / NONPSL Q / PSL IPQ / NONPSL IPQ SOURCES=3/1/0/0"],
        "item_subclass":["12-Resistor"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["RES,TKF,121 ohm,0.063W,1%,SM,0402,Pb-FREE"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601670991872}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["12-2215-02"],
        "commodity_code":["E/M_PASSIVE_RESISTOR_THICK FILM"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129833603",
        "item_lifecycle":"Production",
        "risk_comment":["AUTOUPDATED.09/29/2013: STRATEGY=MULTI/2/PSL (P LD L) - MEETS STRATEGY - CURRENT PSL Q / NONPSL Q / PSL IPQ / NONPSL IPQ SOURCES=3/0/0/0"],
        "item_subclass":["12-Resistor"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["RES,TKF,15 ohm,0.063W,1%,SM,0402,Pb-FREE"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601673089024}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["13-0645-01"],
        "commodity_code":["SEMICONDUCTOR_DIODE_SH"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129915663",
        "item_lifecycle":"Production",
        "risk_comment":["AUTOUPDATED.02/12/2017: Strategy=Multi/2/PSL (P LD L) - Meets Strategy - Current PSL Q / NonPSL Q / PSL IPQ / NonPSL IPQ Sources=3/0/0/0"],
        "item_subclass":["13-Diode"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["DIO,SH,0.4V,10mA,SOT-23,BAT54C"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601676234752}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["13-0787-02"],
        "commodity_code":["SEMICONDUCTOR_DIODE_ZE"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129803677",
        "item_lifecycle":"Production",
        "risk_comment":["AUTOUPDATED.12/10/2015: Strategy=Multi/2/PSL (P LD L) - Find New PSL Sources - Current PSL Q / NonPSL Q / PSL IPQ / NonPSL IPQ Sources=0/2/0/0"],
        "item_subclass":["13-Diode"],
        "risk_rating":["1"],
        "requesting_bu":["TBABU"],
        "item_description":["DIO,ZE,1.2V,20mA,SO8,LM385"],
        "rohsc":["Pass"],
        "risk_reason_code":["A: Qual + IPQ sources is NOT enough sources to meet strategy"],
        "rohsi":["Pass"],
        "_version_":1561492601678331904}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["13-1311-02"],
        "commodity_code":["SEMICONDUCTOR_DIODE_TVS"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129860200",
        "item_lifecycle":"Production",
        "risk_comment":["AUTOUPDATED.10/15/2016: Strategy=Multi/2/PSL (P LD L) - Meets Strategy - Current PSL Q / NonPSL Q / PSL IPQ / NonPSL IPQ Sources=3/0/0/0"],
        "item_subclass":["13-Diode"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["DIO,TS,5V,5uA,SOT-23-6,ARY,SRV05-4,Pb-FREE"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601682526208}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["15-100539-01"],
        "commodity_code":["SEMICONDUCTOR_LINEAR_SWITCHES AND MUX"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"6393235",
        "item_lifecycle":"Production",
        "risk_comment":["AUTOUPDATED.10/12/2015: Strategy=Single/1/PSL (P LD L) - Meets Strategy - Current PSL Q / NonPSL Q / PSL IPQ / NonPSL IPQ Sources=1/0/0/0"],
        "item_subclass":["15-Linear"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["IC-LIN, HOTSWAP, Dual, HI-SIDE, MOSFET SWITCH, FAULT REPORT, ACTIVE HIGH EN, 0.5A LOAD, 1A LIMIT, MSOP, 8P"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601683574784}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["15-102214-01"],
        "commodity_code":["SEMICONDUCTOR_MEMORY_DRAM_MODULE_DDR4_SERVER BU CSPG"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "id":"196332855",
        "item_lifecycle":"Production",
        "risk_comment":["RSOGA (1/5/2017) EXCLUSION THIS CPN IS EXCLUSIVE TO CSPG SERVER NO CISCO STD TRACEABILITY LABELING AND SHIPPING THRU CSPG SERVER EXCLUSIVE SCC"],
        "item_subclass":["15-Memory"],
        "risk_rating":["1"],
        "requesting_bu":["TBABU"],
        "item_description":["IC-DRAM-MOD,DDR4,8GB(1G x 72),1R,1067MHz,1.2 V NOM,0 to 80 C,RDIMM,288P,31.25mm H,8K Cycles,SAVBU-SERVER"],
        "rohsc":["Pass"],
        "risk_reason_code":["G: Alternative recommended for NPI, see comments"],
        "rohsi":["Pass"],
        "_version_":1561492601685671936}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["15-102216-01"],
        "commodity_code":["SEMICONDUCTOR_MEMORY_DRAM_MODULE_DDR4_SERVER BU CSPG"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "id":"196373918",
        "item_lifecycle":"Production",
        "risk_comment":["RSOGA (1/5/2017) EXCLUSION THIS CPN IS EXCLUSIVE TO CSPG SERVER NO CISCO STD TRACEABILITY LABELING AND SHIPPING THRU CSPG SERVER EXCLUSIVE SCC"],
        "item_subclass":["15-Memory"],
        "risk_rating":["1"],
        "requesting_bu":["TBABU"],
        "item_description":["IC-DRAM-MOD,DDR4,16GB(2G x 72),2R,1067MHz,1.2 V NOM,0 to 85 C,RDIMM,288P,31.25 mm H,8K Cycles,SAVBU-SERVER"],
        "rohsc":["Pass"],
        "risk_reason_code":["G: Alternative recommended for NPI, see comments"],
        "rohsi":["Pass"],
        "_version_":1561492601688817664}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["15-13615-02"],
        "commodity_code":["SEMICONDUCTOR_MEMORY_DRAM_MODULE_DDR3_SERVER BU CSPG"],
        "revision":["-A1"],
        "item_category":"Commodity",
        "id":"129975874",
        "item_lifecycle":"End of Production",
        "risk_comment":["RSOGA (1/5/2017) EXCLUSION THIS CPN IS EXCLUSIVE TO CSPG SERVER NO CISCO STD TRACEABILITY LABELING AND SHIPPING THRU CSPG SERVER EXCLUSIVE SCC"],
        "item_subclass":["15-Memory"],
        "risk_rating":["1"],
        "requesting_bu":["TBABU"],
        "item_description":["IC,DRAM-DDR3,16GB DR,1600MHz,RDIMM,240,8K cycles,1.35V - 1.5V,C-TEMP (0 to 70'C),SAVBU-SERVER"],
        "rohsc":["Pass"],
        "risk_reason_code":["G: Alternative recommended for NPI, see comments"],
        "rohsi":["Pass"],
        "_version_":1561492601690914816}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["15-13636-01"],
        "commodity_code":["SEMICONDUCTOR_LINEAR_VOLTAGE REGULATORS"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129931939",
        "item_lifecycle":"Prototype",
        "risk_comment":["PEHASTIN.10/01/2015: STRATEGY=SINGLE/1/PSL (P LD L) - MEETS STRATEGY - CURRENT PSL Q / NONPSL Q / PSL IPQ / NONPSL IPQ SOURCES=1/0/0/0"],
        "item_subclass":["15-Linear"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["IC-LIN,VREG,SYNC SW,PQFN22,4.5-14VIN,25A,300KHZ/500KHz/1MHZ,A-TEMP -40 to 125'C,ADJ,Pb-FREE"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601698254848}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["15-13637-02"],
        "commodity_code":["SEMICONDUCTOR_MEMORY_DRAM_MODULE_DDR3_SERVER BU CSPG"],
        "revision":["-A1"],
        "item_category":"Commodity",
        "pbfree":["Not Applicable"],
        "id":"129975891",
        "item_lifecycle":"End of Support",
        "risk_comment":["RSOGA (1/5/2017) EXCLUSION THIS CPN IS EXCLUSIVE TO CSPG SERVER NO CISCO STD TRACEABILITY LABELING AND SHIPPING THRU CSPG SERVER EXCLUSIVE SCC"],
        "item_subclass":["15-Memory"],
        "risk_rating":["1"],
        "requesting_bu":["TBABU"],
        "item_description":["IC, DRAM,DDR3,8GB DR,1600MHz,RDIMM,240,8K cycles,1.35V,2 Ranks,(35nm 8GB DR BUCKET A),C-TEMP (0 to 70'C),SAVBU-SERVER"],
        "rohsc":["Pass"],
        "risk_reason_code":["G: Alternative recommended for NPI, see comments"],
        "rohsi":["Pass"],
        "_version_":1561492601700352000}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["15-13699-01"],
        "commodity_code":["SEMICONDUCTOR_MPU_BRIDGES"],
        "revision":["-A0"],
        "item_category":"Document",
        "pbfree":["Not Applicable"],
        "id":"129915877",
        "item_lifecycle":"Production",
        "risk_comment":["AUTOUPDATED.11/15/2012: STRATEGY=SINGLE/1/PSL (P LD L) - MEETS STRATEGY - CURRENT PSL Q / NONPSL Q / PSL IPQ / NONPSL IPQ SOURCES=1/0/0/0"],
        "item_subclass":["15-Microprocessor"],
        "risk_rating":["2"],
        "requesting_bu":["TBABU"],
        "item_description":["IC-MP,BRIDGE,FCBGA901,0 to 70'C,PCH,PATSBURG,-J,Pb free,C-TEMP"],
        "rohsc":["Pass"],
        "risk_reason_code":["NA: Not Applicable"],
        "rohsi":["Pass"],
        "_version_":1561492601704546304}},
      {"_index": "dmitemmastermv",
        "_type": "dmitemmastermv",
        "_id": "129886278",
        "_score": 11.7668085,
        "_source": {
        "item_number":["15-13856-02"],
        "commodity_code":["SEMICONDUCTOR_MEMORY_DRAM_MODULE_DDR3_SERVER BU CSPG"],
        "revision":["-A0"],
        "item_category":"Commodity",
        "id":"129795121",
        "item_lifecycle":"Obsolete",
        "risk_comment":["RSOGA (2/1/2017) EXCLUSION THIS CPN IS EXCLUSIVE TO CSPG SERVER NO CISCO STD TRACEABILITY LABELING AND SHIPPING THRU CSPG SERVER EXCLUSIVE SCC"],
        "item_subclass":["15-Memory"],
        "risk_rating":["1"],
        "requesting_bu":["TBABU"],
        "item_description":["IC,DDR3,32GB,800MHz,LR DIMM,PC3-10600,Quad Rank,240,8K cycles,1.35V,SAVBU-SERVER,C-TEMP (0 to 70'C)"],
        "rohsc":["Pass"],
        "risk_reason_code":["G: Alternative recommended for NPI, see comments"],
        "rohsi":["Pass"],
        "_version_":1561492601706643456}}];
  

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
          //brands
          $scope.brandsGroup = uniqueItems($scope.products, 'item_lifecycle');
          $log.debug('Brand '+$scope.brandsGroup);
          var filterAfterBrands = [];
          selected = false;
          for (var j in $scope.products) {
            var p = $scope.products[j];
            for (var i in $scope.useBrands) {
              if ($scope.useBrands[i]) {
                selected = true;
                if (i === p.item_lifecycle) {
                  filterAfterBrands.push(p);
                  break;
                }
              }
            }
          }
          if (!selected) {
            filterAfterBrands = $scope.products;
          }
          //labels
          $scope.labelsGroup = uniqueItems($scope.products, 'item_category');
          var filterAfterLabels = [];
          selected = false;
          for (var j in $scope.products) {
            var p = $scope.products[j];
            for (var i in $scope.useLabels) {
              if ($scope.useLabels[i]) {
                selected = true;
                if (i === p.item_category) {
                  filterAfterLabels.push(p);
                  break;
                }
              }
            }
          }
          if (!selected) {
            filterAfterLabels = filterAfterBrands;
          }
          $scope.filteredProducts = filterAfterLabels;
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
