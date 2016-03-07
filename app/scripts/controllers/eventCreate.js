'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # EventCreateCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCreateCtrl', function ($scope) {
    console.log('eventCreate')
    $scope.event = {};
    $scope.$watch('event', function () {
        console.log($scope.event);
    },true)
});