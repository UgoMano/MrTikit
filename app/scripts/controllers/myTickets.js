'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MyTicketsCtrl
 * @description
 * # MyTicketsCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('MyTicketsCtrl', function ($scope, $Ticket, $Event, $mdToast, $location) {
    if (!$scope.user || !$scope.user.loginKey) {
        $location.path('/login');
    } else {
        $scope.tickets = [];
        $scope.ticketsPromise = $Ticket.getByUser($scope.user.loginKey);
        $scope.ticketsPromise.then(function (tickets) {
                $scope.tickets = tickets;
            },
            function (error) {
                $mdToast.showSimple('error');
                console.log(error);
            });
    }
});