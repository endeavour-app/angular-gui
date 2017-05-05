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

	Home.$inject = ['homeService', '$timeout'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Home(homeService, $timeout) {
		/*jshint validthis: true */
		var vm = this;
		vm.title = "Hello, ang-modular!";
		vm.version = "1.0.0";

		vm.lists = homeService.topLevelLists;

		homeService.fetchTopLevelLists()
			.then(function () {
				$timeout(function () {
					console.log(vm.lists);
				});
			});

	}

})();
