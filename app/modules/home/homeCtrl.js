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

  Home.$inject = ['homeService', '$mdDialog', '$timeout', '_session'];

  /**
   * recommend
   * Using function declarations
   * and bindable members up top.
   */

  function Home(homeService, $mdDialog, $timeout, _session) {
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

    vm.createNewList = function ($event) {

      var confirm = $mdDialog.prompt()
        .title('Name the new Folder')
        .placeholder('Folder name')
        .ariaLabel('Folder name')
        .initialValue('New Folder')
        .targetEvent($event)
        .ok('Create Folder')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function(result) {
        createNewList(result);
      }, function() {

      });

    };

    function createNewList (title) {

      let newList = {
        Title: title,
      };

      homeService
        .createTopLevelList(newList)
        .then(function (res) {
          $timeout(function () {
            Object.assign(newList, res.data);
            newList.ID = res.data.ID;
            newList.Created = {
              date: res.data.Created,
            };
          });
        })
        .catch(function (err) {
          console.log(err);
        });

      vm.lists.push(newList);

    }

    homeService.fetchTopLevelLists()
      .then(function () {
        $timeout(function () {
          console.log(vm.lists);
        });
      });

  }

})();
