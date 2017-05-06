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
    .module('home')
    .controller('HomeCtrl', Home);

  Home.$inject = ['homeService', '$timeout', '_session'];

  /**
   * recommend
   * Using function declarations
   * and bindable members up top.
   */

  function Home(homeService, $timeout, _session) {
    /*jshint validthis: true */
    var vm = this;
    vm.title = "Hello, ang-modular!";
    vm.version = "1.0.0";

    vm.lists = homeService.topLevelLists;
    vm.renaming = {};

    vm.toggleRenaming = function ($event, list) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.renaming[list.ID] = !vm.renaming[list.ID];
    };

    vm.createNewList = function () {

      let newList = {
        Title: 'New Folder',
      };

      homeService
        .createTopLevelList(newList)
        .then(function (res) {
          Object.assign(newList, res.data);
            console.log(res,newList);
        })
        .catch(function (err) {
          console.log(err);
        });

      vm.lists.push(newList);

    };

    homeService.fetchTopLevelLists()
      .then(function () {
        $timeout(function () {
          console.log(vm.lists);
        });
      });

  }

})();
