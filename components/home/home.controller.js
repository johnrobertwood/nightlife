(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$http', 'authService'];

  function HomeController($scope, $http, authService) {

    var vm = this;
    vm.authService = authService;

    var refresh = function() {
      var location = {city: sessionStorage.getItem('city')};
      if (location.city) {
        $http.post('/search', location)
        .then(function(res) {
          $scope.barlist = res.data
          sessionStorage.setItem('city', res.data.city)
        });
      }
    }

    refresh()

    $scope.findBars = function() {
      console.log($scope.barlist)
    	$http.post('/search', $scope.barlist)
    	.then(function(res) {
    		$scope.barlist = res.data
        sessionStorage.setItem('city', res.data.city)
    	});
    };

    $scope.addVote = function(name, loc) {
      var obj = {}
      obj.name = name;
      obj.loc = loc;
      obj.user = sessionStorage.getItem('id_token')
      $http.post('/addvote/', obj)
      .then(function(res) {
        $scope.barlist = res.data
      });
    }
  }

}());
