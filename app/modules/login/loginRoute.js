'use strict';

	/**
	* @ngdoc function
	* @name app.route:HomeRoute
	* @description
	* # HomeRoute
	* Route of the app
	*/

angular.module('login')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider

			.state('app.anon.login', {
				url: '/login',
				templateUrl: 'app/modules/login/login.html',
				controller: 'LoginCtrl',
				controllerAs: '$login',
			});

	}]);
