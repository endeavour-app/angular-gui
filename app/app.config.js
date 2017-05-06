(function () {
  'use strict';

  /**
   * @ngdoc configuration file
   * @name app.config:config
   * @description
   * # Config and run block
   * Configutation of the app
   */


  angular
    .module('ang-modular')
    .config(configureThemes)
    .config(configure)
    .run(runBlock);

  configureThemes.$inject = ['$mdThemingProvider'];
  function configureThemes (  $mdThemingProvider) {

    // var neonRedMap = $mdThemingProvider.extendPalette('red', {
    //   '500': '#ff0000',
    //   'contrastDefaultColor': 'dark'
    // });
    //
    // // Register the new color palette map with the name <code>neonRed</code>
    // $mdThemingProvider.definePalette('neonRed', neonRedMap);
    //
    // // Use that theme for the primary intentions
    // $mdThemingProvider.theme('default')
    //   .primaryPalette('neonRed');

    var sidebarBlueGreyMap = $mdThemingProvider.extendPalette('blue-grey', {
      // 'contrastDefaultColor': 'dark',
    });

    $mdThemingProvider.definePalette('sidebarBlueGrey', sidebarBlueGreyMap);

    $mdThemingProvider.theme('sidenavTheme')
      .primaryPalette('blue-grey')
      .dark();

  }

  configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

  function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $locationProvider.hashPrefix('!');

    // This is required for Browser Sync to work poperly
    // $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


    $stateProvider
      .state('app', {
        abstract: true,
        template: '<div id="app" layout="row" layout-fill ui-view></div>',
      });



    $urlRouterProvider
      .otherwise('/login');

  }

  runBlock.$inject = ['$rootScope'];

  function runBlock($rootScope) {
    'use strict';

    console.log('AngularJS run() function...');
  }


})();
