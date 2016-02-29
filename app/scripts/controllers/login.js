'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('LoginCtrl', function ($scope) {
     console.log('login');
    $scope.user = {};
	$scope.login = function(){
		console.log($scope.user);
		console.log($scope.user.email);
		console.log($scope.user.password);
	}

}); 
