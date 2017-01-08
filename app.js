(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider'];

  function config($stateProvider, lockProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'components/home/home.html',
        controllerAs: 'vm'
      });

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      callbackUrl: AUTH0_CALLBACK_URL
    });

    $urlRouterProvider.otherwise('/home');
  }

})();
