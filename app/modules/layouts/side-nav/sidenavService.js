(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:menuService
	* @description
	* # menuService
	* Service of the app
	*/

	angular
		.module('ang-modular')
		.factory('MenuService', Menu);

	// Inject your dependencies as .$inject = ['$http', '$otherDependency'];
	// function Name ($http, $otherDependency) {...}

	Menu.$inject = ['$http'];

	function Menu($http) {
		// Sample code.

		var menu = [{
			link: '.',
			name: 'This is a Placeholder menu. It disappears when the first module has been created.'
		}];

		return {
			listMenu: function () {
				return menu;
			}
		};

	}

})();
