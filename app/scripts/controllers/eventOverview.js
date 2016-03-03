'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # EventOverviewCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventOverviewCtrl', function ($scope, $stateParams) {
    console.log('eventOverview');
    $scope.setEvent($stateParams.eventId);
    console.log('eventId: ',$scope.curEventId);
});