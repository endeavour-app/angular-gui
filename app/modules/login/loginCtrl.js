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
    .module('login')
    .controller('LoginCtrl', Home);

  Home.$inject = ['loginService','$state'];

  /*
   * recommend
   * Using function declarations
   * and bindable members up top.
   */

  function Home(loginService, $state) {
    /*jshint validthis: true */
    var $login = this;
    $login.title = "Hello, ang-modular!";
    $login.version = "1.0.0";

    $login.credentials = {
      username: 'a.tester@localhost',
      password: '$MYpassword!',
    };

    $login.submit = function () {

      let creds = $login.credentials;
      let username = creds.username;
      let password = creds.password;

      loginService.attemptLogin(username, password)
        .then(function (res) {
          console.log(res);

          loginService.fetchSession()
            .then(function (res) {
              $state.go('app.home.dashboard');
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
