(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name app.service:homeService
   * @description
   * # homeService
   * Service of the app
   */

  angular.module('home')
    .factory('listService', listService);

  listService.$inject = ['backendService'];

  function listService (backendService) {

    return {

      createList: function createList (d) {
        return backendService.postList(d);
      },

      createListItem: function createListItem (d) {
        return backendService.postListItem(d);
      },

      fetchListById: function fetchListById (ListID) {
        return new Promise((resolve, reject) => {
          backendService.getListById({ ID: ListID })
            .then(function (res) {
              let list = res.data;
              resolve(list || {});
            })
            .catch(reject);
        });
      },

      fetchItemsInList: function fetchItemsInList (ListID) {
        return new Promise((resolve, reject) => {
          backendService.getListItemsByListId({ ID: ListID })
            .then(function (res) {
              let items = res.data;
              resolve(items || []);
            })
            .catch(reject);
        });
      },

      fetchListsInList: function fetchListsInList (ListID) {
        return new Promise((resolve, reject) => {
          backendService.getListsByParentId({ ID: ListID })
            .then(function (res) {
              let lists = res.data;
              resolve(lists || []);
            })
            .catch(reject);
        });
      },

    };

  }

})();
