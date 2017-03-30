'use strict';

/**
 * @ngdoc overview
 * @name iHubApp
 * @description
 * # iHubApp
 *
 * Main module of the application.
 */
angular.
  module('iHubApp').
  config(['$locationProvider' ,'$routeProvider','$logProvider',
    function config($locationProvider, $routeProvider,$logProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/home', {
          templateUrl: 'views/land.html',
          controller: 'LandCtrl',
          controllerAs: 'land'
        }).
        when('/search/:search', {
          template: '<item-list></item-list>'
        }).
        when('/items/:id', {
          template: '<item-detail></item-detail>'
        }).
        when('/extitems/:id', {
          templateUrl: 'views/extitem-detail.html',
          controller: 'extItemDetailCtrl',
          controllerAs: 'extItemDetail'
        }).
        otherwise('/home');
        //logger
        $logProvider.debugEnabled(true);

    }
  ]).run(['$rootScope','$log',function($rootScope,$log){
    $rootScope.$log = $log;
  }]);

/*angular
  .module('iHubApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'core',
    'itemDetail',
    'itemList'
  ])
  .config(['$routeProvider','$logProvider','$locationProvider',function ($routeProvider,$logProvider,$locationProvider) {
    $locationProvider.hashPrefix('!');
    //Routes
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/items',{
        templateUrl:'views/item-list.html',
        controller:'ItemsCtrl',
        controllerAs:'item'
      })
      .when('/items/:itemId',{
        templateUrl:'views/item-detail.html',
        controller:'ItemdetailCtrl',
        controllerAs:'itemdetail'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/items'
      });
      //Logger
      $logProvider.debugEnabled(true);
  }])
  .run(['$rootScope','$log',function($rootScope,$log){
    $rootScope.$log = $log;
  }]);*/
