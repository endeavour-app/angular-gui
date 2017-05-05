'use strict';

	/**
	* @ngdoc function
	* @name app.route:HomeRoute
	* @description
	* # HomeRoute
	* Route of the app
	*/

angular.module('ang-modular')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider

			.state('app.home', {
				url: '^',
				abstract: true,
				templateUrl: 'app/modules/home/home.html',
				controller: 'HomeCtrl',
				controllerAs: '$home'
			})
			.state('app.home.dashboard', {
				url:'/dashboard',
				templateUrl: 'app/modules/home/dashboard.html'
			});

	}]);
