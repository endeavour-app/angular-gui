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

	List.$inject = ['listService', '$state', '$timeout'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function List(listService, $state, $timeout) {
		/*jshint validthis: true */
		var $list = this;

    var list = {
      lists: [],
      items: [],
    };

    var ListID = $state.params.id;

    $list.lists = list.lists;
		$list.items = list.items;

    console.log($state.params);

		listService.fetchItemsInList(ListID)
			.then(function (items) {
        items.forEach(item => {
          list.items.push(item);
        });
				$timeout(function () {
				});
			});

		listService.fetchListsInList(ListID)
			.then(function (lists) {
        lists.forEach(item => {
          list.lists.push(item);
        });
				$timeout(function () {
				});
			});

	}

})();
