'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # EventReportsCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventReportsCtrl', function ($scope, $stateParams) {
    console.log('eventReports');
    $scope.setEvent($stateParams.eventId);
    console.log('eventId: ', $scope.curEventId);
});