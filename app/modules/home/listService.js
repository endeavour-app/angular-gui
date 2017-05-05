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
