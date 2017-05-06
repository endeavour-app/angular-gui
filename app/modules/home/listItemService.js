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
		.factory('listItemService', listItemService);

	listItemService.$inject = ['backendService', 'listService'];

	function listItemService (backendService, listService) {

		return {

      fetchListItemById: function fetchListItemById (ListItemID) {
				return new Promise((resolve, reject) => {
  				backendService.getListItemById({ ID: ListItemID })
  					.then(function (res) {
              let listItem = res.data;
              resolve(listItem || {});
  					})
  					.catch(reject);
        });
      },

      fetchListItemsInList: function fetchListItemsInList (ListID) {
				return listService.fetchItemsInList(ListID);
      },

		};

	}

})();
