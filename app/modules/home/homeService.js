(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name app.service:homeService
   * @description
   * # homeService
   * Service of the app
   */

  angular.module('home')
    .factory('homeService', homeService);

  homeService.$inject = ['backendService'];

  function homeService(backendService) {

    var topLevelLists = [];

    return {

      topLevelLists: topLevelLists,

      fetchTopLevelLists: function fetchTopLevelLists () {
        return backendService.getRootLists()
          .then(function (res) {

            let lists = res.data;

            lists.forEach((list) => {
              console.log(list);
              topLevelLists.push(list);
            });

          })
          .catch(function (err) {

          });
      },

    };

  }

})();
