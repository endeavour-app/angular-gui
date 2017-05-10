'use strict';

  /**
   * @ngdoc function
   * @name app.route:HomeRoute
   * @description
   * # HomeRoute
   * Route of the app
   */

angular.module('signup')
  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider

      .state('app.anon.signup', {
        url: '/signup',
        templateUrl: 'app/modules/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: '$signup',
      });

  }]);
