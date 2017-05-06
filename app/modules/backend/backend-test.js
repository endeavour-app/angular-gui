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
		var backendService = null, $httpBackend, loginRequestHandler;

		beforeEach(function () {
			module('backend');
		});

		beforeEach(inject(function ($injector) {
			backendService = $injector.get('backendService');
			$httpBackend = $injector.get('$httpBackend');

			loginRequestHandler = $httpBackend
				.when('POST', 'http://localhost:8888/login')
      		.respond({userId: 'userX'}, {'Content-Type': 'application/json'});

		}));

   	afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
   	});

		it('Should have no session set initially', function () {
			expect(backendService.isSessionSet()).toBe(false);
		});

		describe('backendService.login(attrs)', function () {

			it('Should return a promise', function () {

				$httpBackend.expectPOST('http://localhost:8888/login');

				let result = backendService.login({

				});

				$httpBackend.flush();

				expect(result).toEqual(jasmine.any(Promise));

			});

		});

		describe('backendService.getListItemById(attrs)', function () {

			it('Should return a promise', function () {

				let result = backendService.getListItemById({
					ID: 123,
				});

				expect(result).toEqual(jasmine.any(Promise));

			});

		});

	});



})();
