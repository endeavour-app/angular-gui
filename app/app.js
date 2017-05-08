(function() {
  'use strict';

  /**
   * @ngdoc index
   * @name app
   * @description
   * # app
   *
   * Main module of the application.
   */

  angular.module('endeavour-app', [
    'ngResource',
    'ngAria',
    'ngMaterial',
    'ngMdIcons',
    'ngMessages',
    'ngCookies',
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'backend',
    'home',
    'anon',
    'login',
  ]);

})();
