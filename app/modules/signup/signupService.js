(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name app.service:homeService
   * @description
   * # homeService
   * Service of the app
   */

  angular.module('signup')
    .factory('signupService', signupService);

  signupService.$inject = ['$http', 'backendService'];

  function signupService($http, backendService) {

    return {

      fetchSession: function fetchSession () {
        return backendService.getSessionById(0);
      },

      useSession: function useSession (id, token) {
        return backendService.useSession(id, token);
      },

      logout: function endSession () {
        return backendService.logout()
          .then(function () {
            backendService.clearSession();
            window.location = '/#!/login';
          })
          .catch(function () {
            backendService.clearSession();
            window.location = '/#!/login';
          });
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
