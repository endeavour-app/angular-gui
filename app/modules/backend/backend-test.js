(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.test:homeTest
	* @description
	* # homeTest
	* Test of the app
	*/

	describe('backendService', function () {
		var backendService = null, $httpBackend;
		var loginRequestHandler, getListItemByIdRequestHandler;

		beforeEach(function () {
			module('backend');
		});

		beforeEach(inject(function ($injector) {

			backendService = $injector.get('backendService');
			$httpBackend = $injector.get('$httpBackend');

			let loginResponse = {
				ID: 123,
				UserID: 456,
			};

			loginRequestHandler = $httpBackend
				.when('POST', 'http://localhost:8888/login')
      		.respond(loginResponse, {'Content-Type': 'application/json'});

			let getListItemResponse = function () {
				return {
					"ID":136,
					"ListID":10,
					"UserID":1,
					"Summary":"make it add something when you double click",
					"Created":{"date":"2014-03-17 01:45:08.000000","timezone_type":3,"timezone":"UTC"},
					"Completed":null,
					"Due":null,
					"Deleted":false
				};
			};

			getListItemByIdRequestHandler = $httpBackend
				.when('GET', 'http://localhost:8888/listitems/123')
      		.respond(getListItemResponse(), {'Content-Type': 'application/json'});

		}));

   	afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
   	});

		it('Should have no session set initially', function () {
			expect(backendService.isSessionSet()).toBe(false);
		});

		describe('backendService.login(attrs)', function () {

			let result;

			beforeEach(function () {

				$httpBackend.expectPOST('http://localhost:8888/login');

				result = backendService.login({
					EmailAddress: 'test@localhost',
					Password: 'mypassword1',
				});

				$httpBackend.flush();

			});

			it('Should return a promise', function () {

				expect(result).toEqual(jasmine.any(Promise));

			});

			it('Should issue the request to the correct remote endpoint', function (done) {

				result
					.then(function (res) {
						expect(res.config.url).toBe('http://localhost:8888/login');
						done();
					})
					.catch(function (err) {
						done(false);
					});

			});

			it('Should issue the request using the correct HTTP method', function (done) {

				result
					.then(function (res) {
						expect(res.config.method).toBe('POST');
						done();
					})
					.catch(function (err) {
						done(false);
					});

			});

			it('Should send the correct data to the remote endpoint', function (done) {

				result
					.then(function (res) {

						let requestData = JSON.parse(res.config.data);

						expect(requestData).toEqual(jasmine.objectContaining({
							EmailAddress: 'test@localhost',
							Password: 'mypassword1',
						}));

						done();

					})
					.catch(function (err) {
						done(false);
					});

			});

		});

		describe('backendService.getListItemById(attrs)', function () {

			let result;

			beforeEach(function () {

				$httpBackend.expectGET('http://localhost:8888/listitems/123');

				result = backendService.getListItemById({
					ID: 123,
				});

				$httpBackend.flush();

			});

			it('Should return a promise', function () {

				expect(result).toEqual(jasmine.any(Promise));

			});

			it('Should request the correct remote resource', function (done) {

				result
					.then(function (res) {
						expect(res.config.url).toBe('http://localhost:8888/listitems/123');
						done();
					})
					.catch(function (err) {
						done(false);
					});

			});

			it('Should issue the request using the correct HTTP method', function (done) {

				result
					.then(function (res) {
						expect(res.config.method).toBe('GET');
						done();
					})
					.catch(function (err) {
						done(false);
					});

			});

		});

	});



})();
