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
		.module('ang-modular')
		.controller('LoginCtrl', Home);

	Home.$inject = ['loginService'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Home(loginService) {
		/*jshint validthis: true */
		var $login = this;
		$login.title = "Hello, ang-modular!";
		$login.version = "1.0.0";

		$login.credentials = {
			username: 'kounterfeitreality@gmail.com',
			password: '$kazahawk1097',
		};

		$login.submit = function () {

			let creds = $login.credentials;
			let username = creds.username;
			let password = creds.password;

			loginService.attemptLogin(username, password)
				.then(function (res) {
					console.log(res);

					loginService.useSession(res.data.UserID, res.data.Key);

					loginService.fetchSession()
						.then(function (res) {
							window.location = '/#!/dashboard';
							console.log(res);
						})
						.catch(function (err) {
							console.log(err);
						});

				})
				.catch(function (err) {
					console.log(err);
				});

		};

	}

})();
