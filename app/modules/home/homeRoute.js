'use strict';

  /**
   * @ngdoc function
   * @name app.route:HomeRoute
   * @description
   * # HomeRoute
   * Route of the app
   */

angular.module('home')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider

      .state('app.home', {
        url: '^',
        abstract: true,
        templateUrl: 'app/modules/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: '$home',
      })
      .state('app.home.dashboard', {
        url:'/dashboard',
        templateUrl: 'app/modules/home/dashboard.html',
      })
      .state('app.home.list', {
        url:'/list/:id',
        templateUrl: 'app/modules/home/list.html',
        controller: 'ListCtrl',
        controllerAs: '$list',
      });

  }]);
