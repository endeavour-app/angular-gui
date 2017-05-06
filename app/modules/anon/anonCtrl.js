(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name app.controller:HomeCtrl
   * @description
   * # HomeCtrl
   * Controller of the app
   */

  angular
    .module('anon')
    .controller('AnonCtrl', Home);

  Home.$inject = ['anonService'];

  /*
  * recommend
  * Using function declarations
  * and bindable members up top.
  */

  function Home(anonService) {
    /*jshint validthis: true */
    var vm = this;
    vm.title = "Hello, ang-modular!";
    vm.version = "1.0.0";
    vm.listFeatures = anonService.getFeaturesList();

  }

})();
