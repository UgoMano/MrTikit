'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # EventOverviewCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventOverviewCtrl', function ($scope, $stateParams, $backend,$Event, $mdToast) {
    console.log('eventOverview');
    $scope.setEvent($stateParams.eventId);
    console.log('eventId: ',$scope.curEventId);
    $scope.event = {};
    $scope.eventPromise = $Event.get($scope.curEventId, $scope.user.loginKey);
    $scope.eventPromise.then(function(event){
        $scope.event = event;
        $mdToast.showSimple('Event Load: Success');
        console.log(JSON.stringify($scope.event,null,'\t'));
    },function(error) {
        console.log(error);
        $mdToast.showSimple('Event Load: Error');
    })
    $scope.attendees = $backend.getAttendees($scope.curEventId);
});