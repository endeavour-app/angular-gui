(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:homeService
	* @description
	* # homeService
	* Service of the app
	*/

	angular.module('login')
		.factory('loginService', homeService);

	homeService.$inject = ['$http', 'backendService'];

	function homeService($http, backendService) {

		backendService.getSession();

		return {

			fetchSession: function fetchSession () {
				return backendService.getSessionById({ ID: 0 });
			},

			useSession: function useSession (id, token) {
				return backendService.useSession(id, token);
			},

			attemptLogin: function attemptLogin (username, password) {
				return backendService.login({
					EmailAddress: username,
					Password: password,
				});
			},

		};

	}

})();
