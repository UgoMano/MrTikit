'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # MyEventsCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('MyEventsCtrl', function ($scope, $Event, $mdToast) {
    console.log('myEvents')
    $scope.eventsPromise =  $Event.getAll($scope.user.loginKey);
    $scope.eventsPromise.then(function(events) {
        $mdToast.showSimple('success');
        console.log(events);
        $scope.events = events;
    }, function(error) {
        $mdToast.showSimple('error');
        console.log(error);
    });
});