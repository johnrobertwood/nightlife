(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$http', 'authService'];

  function HomeController($scope, $http, authService) {

    var vm = this;
    vm.authService = authService;

    $scope.findBars = function() {
    	$http.post('/search', $scope.barlist)
    	.then(function(res) {
    		$scope.barlist = res.data
        sessionStorage.setItem('city', res.data.city)
    	});
    };

    $scope.addVote = function(name, loc, user) {
      var obj = {}
      obj.name = name;
      obj.loc = loc;
      obj.user = sessionStorage.getItem('id_token')
      $http.post('/addvote/', obj)
      .then(function(res) {
        $scope.barlist = res.data
      });
    }

    var refresh = function() {
      var location = {city: sessionStorage.getItem('city')};
      var bar = {name: sessionStorage.getItem('bar')}
      if (location.city) {
        $http.post('/search', location)
        .then(function(res) {
          $scope.barlist = res.data
          sessionStorage.setItem('city', res.data.city)
        });
      }
      if (bar.name) {
        console.log(sessionStorage.getItem('bar'))
        $scope.addVote(bar.name, location.city)
        sessionStorage.removeItem('bar')
      }
    }

    refresh()
  }

}());
