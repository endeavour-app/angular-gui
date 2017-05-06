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

    let backendService = null;
    let $httpBackend;
    let loginRequestHandler;
    let getListItemByIdRequestHandler;

    beforeEach(function () {
      module('backend');
    });

    beforeEach(inject(function ($injector) {

      backendService = $injector.get('backendService');
      $httpBackend = $injector.get('$httpBackend');

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

        let sessionData = function () {
          return {
            "ID": 379,
            "UserID": 138,
            "Key": "3ce41b9926934cf7a70628f751dc87b8",
            "Expiry": 31536000,
            "Created": "2017-05-06T12:59:49+0000",
            "Revoked": false,
          };
        };

        loginRequestHandler = $httpBackend
          .when('POST', 'http://localhost:8888/login')
            .respond(sessionData(), {'Content-Type': 'application/json'});

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

    describe('backendService.getListItemById(id)', function () {

      let result;
      let testID;

      beforeEach(function () {

        testID = 136;

        let getListItemResponse = function () {
          return {
            "ID": testID,
            "ListID": 10,
            "UserID": 1,
            "Summary": "make it add something when you double click",
            "Created": {"date":"2014-03-17 01:45:08.000000","timezone_type":3,"timezone":"UTC"},
            "Completed": null,
            "Due": null,
            "Deleted": false
          };
        };

        getListItemByIdRequestHandler = $httpBackend
          .when('GET', 'http://localhost:8888/listitems/' + testID)
            .respond(getListItemResponse(), {'Content-Type': 'application/json'});

        $httpBackend.expectGET('http://localhost:8888/listitems/' + testID);

        result = backendService.getListItemById(testID);

        $httpBackend.flush();

      });

      it('Should return a promise', function () {

        expect(result).toEqual(jasmine.any(Promise));

      });

      it('Should request the correct remote resource', function (done) {

        result
          .then(function (res) {
            expect(res.config.url).toBe('http://localhost:8888/listitems/' + testID);
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
