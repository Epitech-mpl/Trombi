'use strict'

angular.module('trombiApp')
  .config(['$routeProvider',
	  function($routeProvider) {
	    $routeProvider.
	      when('/game', {
	        templateUrl: 'views/game.html',
	        controller: 'GameCtrl'
	      });
	  }])
  .controller('GameCtrl', ['$scope', '$rootScope', '$location', 'Student', GameCtrl]);

function GameCtrl($scope, $rootScope, $location, Student) {
  if ($rootScope.gameMode == undefined || $rootScope.searchMode == undefined || $rootScope.promotion == undefined) {
    $location.url("/");
    return ;
  }

  $scope.score = 0;
  $scope.total = 0;
  $scope.successColor = "inherit";
  $scope.rightAnswer = undefined;

  $scope.getNewStudent = function () {
  	var prom = $scope.students[$rootScope.promotion];
  	$scope.student = prom[Math.floor(Math.random() * prom.length)];
    if ($rootScope.gameMode == 'choices') {
      $scope.possibleChoices = [$scope.student[$rootScope.searchMode]];
      while ($scope.possibleChoices.length < 4) {
        var tmp = prom[Math.floor(Math.random() * prom.length)][$rootScope.searchMode];
        if ($scope.possibleChoices.indexOf(tmp) == -1) {
          $scope.possibleChoices.splice(Math.floor(Math.random() * ($scope.possibleChoices.length + 1)), 0, tmp);
        }
      }
    }
 	};

  $scope.checkAnswer = function () {
  	if ($scope.answer == $scope.student[$rootScope.searchMode]) {
  		$scope.getNewStudent();
  		$scope.answer = "";
  	}
 	};

  $scope.checkChoice = function(choice) {
    $scope.total = $scope.total + 1;
    if (choice == $scope.student[$rootScope.searchMode]) {
      $scope.successColor = "#A1D490";
      $scope.score = $scope.score + 1;
      $scope.rightAnswer = undefined;
      $scope.getNewStudent();
    } else {
      $scope.rightAnswer = $scope.student[$rootScope.searchMode];
      $scope.successColor = "#D4A190";
    }
  }

  $scope.help = function () {
  	if ($scope.answer == undefined) {
  		$scope.answer = "";
  	}
  	for (var i = 0; i < $scope.answer.length; ++i) {
  		if (i < $scope.student[$rootScope.searchMode].length && $scope.answer[i] == $scope.student[$rootScope.searchMode][i]) {
  			continue ;
  		}
  		$scope.answer = $scope.answer.substr(0, i);
  		break ;
  	}
  	if ($scope.answer == $scope.student[$rootScope.searchMode]) {
  		return ;
  	}
  	$scope.answer += $scope.student[$rootScope.searchMode][$scope.answer.length];
 	};

  $scope.giveUp = function () {
  	$scope.answer = $scope.student[$rootScope.searchMode];
 	};

 	function begin() {
	  $scope.students = Student.allStudents;
		$scope.getNewStudent();
 	}
  
 	if (Student.loading != undefined) {
 		Student.loading.success(function () {
 			begin();
 		});
 	} else {
	 	begin();
 	}
}