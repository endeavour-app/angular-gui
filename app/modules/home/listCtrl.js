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
    .controller('ListCtrl', List);

  List.$inject = ['listService', '$state', '$stateParams', '$timeout'];

  /**
   * recommend
   * Using function declarations
   * and bindable members up top.
   */

  function List(listService, $state, $stateParams, $timeout) {
    /*jshint validthis: true */
    var $list = this;

    var list = {
      model: {ParentID: null, Title: ''},
      lists: [],
      items: [],
    };

    $list.model = list.model;
    $list.lists = list.lists;
    $list.items = list.items;

    $list.getParentId = function () {
      return list.model.ParentID;
    };

    loadList();

    console.log($stateParams);

    function loadList () {

      var ListID = $stateParams.id;

      listService.fetchListById(ListID)
        .then(function (newListModel) {
          Object.assign(list.model, newListModel);
          $timeout(function () {
          });
        });

      listService.fetchItemsInList(ListID)
        .then(function (items) {
          list.items.splice(0);
          items.forEach(item => {
            list.items.push(item);
          });
          $timeout(function () {
          });
        });

      listService.fetchListsInList(ListID)
        .then(function (lists) {
          list.lists.splice(0);
          lists.forEach(item => {
            list.lists.push(item);
          });
          $timeout(function () {
          });
        });

      }

  }

})();
