'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # EventAttendeesCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventAttendeesCtrl', function ($scope, $stateParams) {
    console.log('eventAttendees');
    $scope.setEvent($stateParams.eventId);
    console.log('eventId: ', $scope.curEventId);
});