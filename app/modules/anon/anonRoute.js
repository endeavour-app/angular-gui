'use strict';

	/**
	* @ngdoc function
	* @name app.route:HomeRoute
	* @description
	* # HomeRoute
	* Route of the app
	*/

angular.module('anon')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider

			.state('app.anon', {
				abstract: true,
				url: '^',
				templateUrl: 'app/modules/anon/anon.root.html',
				controller: 'AnonCtrl',
				controllerAs: '$anon'
			});

	}]);
