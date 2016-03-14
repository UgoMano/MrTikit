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
            console.log($scope.ticket);
            JsBarcode("#barcode", $scope.ticket.scanId, {
                width: 10,
                height: 400
            });
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
