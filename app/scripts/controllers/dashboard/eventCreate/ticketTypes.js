'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventCreateTicketTypesCtrl
 * @description
 * # EventCreateTicketTypesCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCreateTicketTypesCtrl', function ($scope, $TicketType, $stateParams, $mdToast, $location) {
    $scope.setEvent($stateParams.eventId);
    $scope.setStep(2);
    $scope.ticketTypes = [];
    var getTTPromise = $TicketType.getByEvent($scope.curEventId);
    getTTPromise.then(function (ticketTypes) {
        $scope.ticketTypes = ticketTypes;
        $scope.ticketTypes.push({});
    }, function (error) {
        if (error.error) {
            $mdToast.showSimple('Error: ' + error.error);
        } else if (error.data && error.data.message) {
            $mdToast.showSimple('Error: ' + error.data.message);
        } else {
            $mdToast.showSimple('Error: Unkown')
            console.log(error);
        }
    })
});