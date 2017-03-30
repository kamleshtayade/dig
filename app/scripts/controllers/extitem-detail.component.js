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
      {'name': 'PartNumber','value':'1212345'},
      {'name': 'Manufacturer','value':'PHOENIX CONTACT'},
      {'name': 'ManufacturerID','value':'1487'},
      {'name': 'PartDescription','value':'Die (Lower Part), For Crimpfox-C50, For Uninsulated Cable Lugs (DinÂ 46228) 35Â MmÂ², Indent Crimp'},
      {'name': 'Datasheet','value':''},
      {'name': 'OnlineSupplierDatasheetURL','value':''},
      {'name': 'RadHard','value':''},
      {'name': 'DoseLevel','value':''},
      {'name': 'TaxonomyPath','value':''},
      {'name': 'TaxonomyPathIDs','value':''},
      {'name': 'ECCN','value':''},
      {'name': 'UNSPSC','value':''},
      {'name': 'OtherSources','value':''},
      {'name': 'LastCheckDate','value':''},
      {'name': 'PartMarking','value':''},
      {'name': 'IntroductionDate','value':''},
      {'name': 'MilitarySpecifications','value':''},
      {'name': 'ESDClass','value':''},
      {'name': 'ESDSourceofInformation','value':''},
      {'name': 'AuthorizedDistributors','value':''},
      {'name': 'PartStatus','value':''},
      {'name': 'LTBDate','value':''},
      {'name': 'Source','value':''},
      {'name': 'EstimatedYearsToEOL','value':''},
      {'name': 'EstimatedEOLDate','value':''},
      {'name': 'PartLifecycleStage','value':''},
      {'name': 'MinimumEstimatedYearsToEOL','value':''},
      {'name': 'MaximumEstimatedYearsToEOL','value':''},
      {'name': 'LifeCycleRiskGrade','value':''},
      {'name': 'OverallRisk','value':''},
      {'name': 'PartCounterfeitReports','value':''},
      {'name': 'Type','value':''},
      {'name': 'MinimumPrice','value':''},
      {'name': 'AveragePrice','value':''}
    ];
    
  }]);