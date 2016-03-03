'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # MyEventsCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('MyEventsCtrl', function ($scope) {
     console.log('myEvents')
     $scope.events=[
         {'eventId':1},
         {'eventId':2},
         {'eventId':3},
         {'eventId':4},
         {'eventId':5}
     ];
});