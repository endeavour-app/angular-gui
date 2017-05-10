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
    .module('signup')
    .controller('SignupCtrl', Signup);

  Signup.$inject = ['signupService'];

  /*
   * recommend
   * Using function declarations
   * and bindable members up top.
   */

  function Signup(signupService) {
    /*jshint validthis: true */
    var $signup = this;

    $signup.formData = {
      EmailAddress: '',
      FirstName: '',
      LastName: '',
      TimeZone: 'utc',
    };

    $signup.submit = function () {

      let formData = $signup.formData;

      signupService.trySignup(formData)
        .then(function (res) {
          console.log(res);

          loginService.fetchSession()
            .then(function (res) {
              window.location = '/#!/signup/success';
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
