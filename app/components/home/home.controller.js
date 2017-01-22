(function () {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$http', 'authService'];

  function HomeController($scope, $http, authService) {

    var vm = this;
    vm.authService = authService;

    $scope.fetching = function() {
      $scope.isFetching = true;
      $scope.badLocation = false;
    }

    $scope.findBars = function() {
    	$http.post('/search', $scope.barlist)
    	.then(function(res) {
        if (res.data.statusCode === 400) {
          $scope.isFetching = false;
          $scope.badLocation = true;
          $scope.errorBar = res.config.data.city;
          $scope.barlist = undefined
          sessionStorage.clear()
        } else {
          $scope.isFetching = false;
          $scope.badLocation = false;
      		$scope.barlist = res.data
          sessionStorage.setItem('city', res.data.city)
        }
    	}, function(err) {
        console.log("FAILED", err)
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
      if (location.city !== "undefined" && location.city) {
        $scope.barlist = location
        $http.post('/search', location)
        .then(function(res) {
          sessionStorage.setItem('city', res.data.city)
          $scope.barlist = res.data;
          $scope.findBars()
        });
      }
      if (bar.name && $scope.isAuthenticated) {
        $scope.addVote(bar.name, location.city)
      }
    }

    refresh()
  }

}());
