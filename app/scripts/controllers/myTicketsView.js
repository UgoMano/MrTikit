'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MyTicketsViewCtrl
 * @description
 * # MyTicketsViewCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('MyTicketsViewCtrl', function ($scope, $Ticket, $Event, $mdToast, $location, $stateParams) {
    if (!$scope.user || !$scope.user.loginKey) {
        $location.path('/login');
    } else {
        $scope.ticket = {};
        $scope.event = {};
        $scope.ticketsPromise = $Ticket.get($stateParams.ticketId, $scope.user.loginKey);
        $scope.ticketsPromise.then(function (ticket) {
            $scope.ticket = ticket;
            console.log(ticket);
            /*JsBarcode("#barcode", $scope.ticket.scandId, {
                width: 1,
                height: 25,
                displayValue: true
            });*/
            $scope.eventPromise = $Event.get($scope.ticket.event, $scope.user.loginKey);
            $scope.eventPromise.then(function (event) {
                $scope.event = event;
                $mdToast.showSimple('Event Load: Success');
            }, function (error) {
                console.log(error);
                $mdToast.showSimple('Event Load: Error');
            })
        }, function (error) {
            $mdToast.showSimple('error');
            console.log(error);
        });

    }
});