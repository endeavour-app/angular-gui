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

  List.$inject = ['listService', '$mdDialog', '$state', '$stateParams', '$timeout', '_list', '_lists', '_items'];

  /**
   * recommend
   * Using function declarations
   * and bindable members up top.
   */

  function List(listService, $mdDialog, $state, $stateParams, $timeout, _list, _lists, _items) {
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

    $list.editingSubListTitle = null;
    $list.newSubListTitle = null;

    $list.renameList = function (toggle) {

      if (toggle === true && $list.renaming) {
        return;
      }

      if (!$list.renaming) {
        $list.newTitle = $list.model.Title;
      }

      $list.renaming = !$list.renaming;

    };

    $list.editSubListTitle = function ($event, subList) {
      console.log(subList);
      $list.editingSubListTitle = subList.ID;
      $list.newSubListTitle = subList.Title;
    };

    $list.saveNewSubListTitle = function (subList) {

      if (!$list.newSubListTitle) {
        return $list.editingSubListTitle = null;
      }

      let newTitle = $list.newSubListTitle;
      $list.newSubListTitle = '';

      listService
        .saveListTitle(subList.ID, newTitle)
        .then(function (res) {
          $timeout(function () {
            Object.assign(subList, res.data);
            subList.Title = res.data.Title;
            $list.editingSubListTitle = null;
          });
        })
        .catch(function (err) {
          console.log(err);
        });

    };

    $list.saveNewTitle = function () {

      if (!$list.newTitle) {
        return $list.renameList();
      }

      let newTitle = $list.newTitle;
      $list.newTitle = '';

      listService
        .saveListTitle($list.model.ID, newTitle)
        .then(function (res) {
          $timeout(function () {
            Object.assign($list.model, res.data);
            $list.model.Title = res.data.Title;
            $list.renaming = false;
          });
        })
        .catch(function (err) {
          console.log(err);
        });

    };

    $list.getParentId = function () {
      return list.model.ParentID;
    };

    $list.deleteList = function ($event) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Delete ' + list.model.Title + '?')
        .textContent('All items and sub-folders will also be removed')
        .ariaLabel('Confirm Intention')
        .targetEvent($event)
        .ok('Delete folder')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        // on confirm
      }, function() {
        // on cancel
      });
    };

    $list.createNewList = function ($event) {

      var confirm = $mdDialog.prompt()
        .title('Name the new Folder')
        .placeholder('Folder name')
        .ariaLabel('Folder name')
        .initialValue('New Sub-folder')
        .targetEvent($event)
        .ok('Create Folder')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(function(result) {
        createNewList(result);
      }, function() {

      });

    };

    $list.createNewListItem = function () {
      createNewListItem(useNewItemSummary());
    };

    loadList();

    console.log($stateParams);

    function useNewItemSummary () {
      let newItemSummary = $list.newItemSummary;
      $list.newItemSummary = '';
      return newItemSummary || 'New Item';
    }

    function createNewList (title) {

      let newList = {
        ParentID: $list.model.ID,
        Title: title,
      };

      listService
        .createList(newList)
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

      $list.lists.push(newList);

    }

    function createNewListItem (summary) {

      let newListItem = {
        ListID: $list.model.ID,
        Summary: summary,
      };

      listService
        .createListItem(newListItem)
        .then(function (res) {
          $timeout(function () {
            Object.assign(newListItem, res.data);
            newListItem.Created = {
              date: res.data.Created,
            };
            $list.items.push(newListItem);
          });
        })
        .catch(function (err) {
          console.log(err);
        });

    }

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
