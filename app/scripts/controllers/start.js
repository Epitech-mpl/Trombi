'use strict'

angular.module('trombiApp')
  .config(['$routeProvider',
	  function($routeProvider) {
	    $routeProvider.
	      when('/', {
	        templateUrl: 'views/start.html',
	        controller: 'StartCtrl'
	      });
	  }])
  .controller('StartCtrl', ['$rootScope', '$scope', '$location', 'Student', StartCtrl]);

function StartCtrl($rootScope, $scope, $location, Student) {
	$rootScope.gameMode = "choices";
	$rootScope.searchMode = "login";
	$scope.promotions = [];
	$rootScope.promotion = "";
	$scope.start = function() {
		$location.url("/game");
	}

 	function begin() {
 		console.log(Student.allStudents);
	  $scope.promotions = Object.keys(Student.allStudents);
	  if ($scope.promotions.length > 0) {
			$rootScope.promotion = $scope.promotions[$scope.promotions.length - 1];
	  }
 	}
 	if (Student.loading != undefined) {
 		Student.loading.success(function () {
 			begin();
 		});
 	} else {
	 	begin();
 	}

}