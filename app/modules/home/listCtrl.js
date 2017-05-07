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

  List.$inject = ['listService', '$state', '$stateParams', '$timeout', '_list', '_lists', '_items'];

  /**
   * recommend
   * Using function declarations
   * and bindable members up top.
   */

  function List(listService, $state, $stateParams, $timeout, _list, _lists, _items) {
    /*jshint validthis: true */
    var $list = this;

    var list = {
      model: _list,
      lists: _lists,
      items: _items,
    };

    $list.model = list.model;
    $list.lists = list.lists;
    $list.items = list.items;

    $list.newItemSummary = '';
    $list.newTitle = '';
    $list.renaming = false;

    $list.renameList = function (toggle) {

      if (toggle === true && $list.renaming) {
        return;
      }

      if ($list.renaming) {
        $list.newTitle = $list.model.Title;
      }

      $list.renaming = !$list.renaming;

    };

    $list.saveNewTitle = function () {

      if (!$list.newTitle) {
        return $list.renameList();
      }

      $list.model.Title = $list.newTitle;

      listService
        .saveListTitle($list.model.ID, $list.model.Title)
        .then(function (res) {
          Object.assign($list.model, res.data);
        })
        .catch(function (err) {
          console.log(err);
        });

    };

    $list.getParentId = function () {
      return list.model.ParentID;
    };

    $list.createNewList = function () {

      let newList = {
        ParentID: $list.model.ID,
        Title: 'New Sub-Folder',
      };

      listService
        .createList(newList)
        .then(function (res) {
          Object.assign(newList, res.data);
        })
        .catch(function (err) {
          console.log(err);
        });

      $list.lists.push(newList);

    };

    function useNewItemSummary () {
      let newItemSummary = $list.newItemSummary;
      $list.newItemSummary = '';
      return newItemSummary || 'New Item';
    }

    $list.createNewListItem = function () {

      let newListItem = {
        ListID: $list.model.ID,
        Summary: useNewItemSummary(),
      };

      listService
        .createListItem(newListItem)
        .then(function (res) {
          Object.assign(newListItem, res.data);
        })
        .catch(function (err) {
          console.log(err);
        });

      $list.items.push(newListItem);

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
