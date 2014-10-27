'use strict';

angular.module('twebProject01App')
  .controller('AboutCtrl', function ($scope) {
    $scope.message = 'Hello';
	
	$scope.counter = 0;
	$scope.incParam = 1;
	$scope.increment = function() {
		$scope.counter = $scope.counter+$scope.incParam;
	};
	$scope.reset = function() {
		$scope.counter = 0;
	};
  });
