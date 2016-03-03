'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # EventManageCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventManageCtrl', function () {
    console.log('eventManage');
    $scope.setEvent($stateParams.eventId);
    console.log('eventId: ', $scope.curEventId);
});