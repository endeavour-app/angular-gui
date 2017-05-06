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
        resolve: {
          _session: ['backendService', '$state', function (backendService, $state) {
            return backendService
              .getSession()
              .catch((err) => {
                $state.go('app.anon.login');
              });
          }],
        },
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
        resolve: {
          _list: ['listService', '$stateParams', function (listService, $stateParams) {
            return listService.fetchListById($stateParams.id);
          }],
          _lists: ['listService', '$stateParams', function (listService, $stateParams) {
            return listService.fetchListsInList($stateParams.id);
          }],
          _items: ['listService', '$stateParams', function (listService, $stateParams) {
            return listService.fetchItemsInList($stateParams.id);
          }],
        }
      });

  }]);
