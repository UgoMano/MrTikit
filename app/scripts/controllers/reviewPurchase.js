'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:ReviewPurchaseCtrl
 * @description
 * # ReviewPurchaseCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('ReviewPurchaseCtrl', function ($scope,$timeout) {
    $scope.loadComplete = false;
    $scope.tickets = [];
    $timeout(function() {
        $scope.loadComplete = true;
        $scope.tickets = [{id:1,},{id:2}];
    
    },500);
});