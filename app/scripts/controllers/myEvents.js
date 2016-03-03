'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # MyEventsCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('MyEventsCtrl', function ($scope, $backend) {
     console.log('myEvents')
     $scope.events= $backend.getEvents();
});