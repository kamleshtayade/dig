'use strict';

/**
 * @ngdoc function
 * @name iHubApp.controller:ItemdetailCtrl
 * @description
 * # extItemDetailCtrl
 * Controller of the iHubApp
 */
angular.module('extItemDetail')
  .controller('extItemDetailCtrl', ['$log', '$scope', '$routeParams', function LandController($log, $scope, $routeParams) {
    $scope.extItem = $routeParams.id;

$scope.colValues = [
      'http://download.siliconexpert.com/pdfs/2016/12/19/4/31/20/802/phx_/manual/1212345.pdf', 'http://www.phoenixcontact.com/us/products/1212345', '', '', 'Fasteners and Hardware > Hardware > Hardware Tools', '103732 > 103766 > 3721', 'EAR99', '', '0', '90', '0', '7/19/2010', '', '', '', '1', 'Active', '', 'http://download.siliconexpert.com/pdfs/2009/wda/phoenix contact/1212345.html', '7.5', '2025', 'Mature', '7.5', '7.5', 'Low Risk', '31%', '', 'Die Set', '29.882', '43.896'
    ];
    $scope.colNames = [
      {'name':'ComID','value':'46403854'}, 
      {'name':'Data Provider ID','value':'46403854'},
      {'name': 'Part Number','value':'1212345'},
      {'name': 'Manufacturer','value':'PHOENIX CONTACT'},
      {'name': 'Manufacturer ID','value':'1487'},
      {'name': 'Part Description','value':'Die (Lower Part), For Crimpfox-C50, For Uninsulated Cable Lugs (DinÂ 46228) 35Â MmÂ², Indent Crimp'},
      {'name': 'Datasheet','value':''},
      {'name': 'Online Supplier DatasheetURL','value':''},
      {'name': 'RadHard','value':''},
      {'name': 'Dose Level','value':''},
      {'name': 'Taxonomy Path','value':''},
      {'name': 'Taxonomy Path IDs','value':''},
      {'name': 'ECCN','value':''},
      {'name': 'UNSPSC','value':''},
      {'name': 'Other Sources','value':''},
      {'name': 'Last Check Date','value':''},
      {'name': 'Part Marking','value':''},
      {'name': 'Introduction Date','value':''},
      {'name': 'Military Specifications','value':''},
      {'name': 'ESDClass','value':''},
      {'name': 'ESDSource of Information','value':''},
      {'name': 'Authorized Distributors','value':''},
      {'name': 'Part Status','value':''},
      {'name': 'LTB Date','value':''},
      {'name': 'Source','value':''},
      {'name': 'Estimated Years To EOL','value':''},
      {'name': 'Estimated EOL Date','value':''},
      {'name': 'Part Lifecycle Stage','value':'Mature'},
      {'name': 'Minimum Estimated Years ToEOL','value':''},
      {'name': 'Maximum Estimated YearsToEOL','value':''},
      {'name': 'Life Cycle Risk Grade','value':''},
      {'name': 'Overall Risk','value':''},
      {'name': 'Part Counterfeit Reports','value':''},
      {'name': 'Type','value':''},
      {'name': 'Minimum Price','value':'$ 29.882'},
      {'name': 'Average Price','value':'$ 43.896'}
    ];
    
  }]);