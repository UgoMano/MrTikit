'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCtrl', function ($scope, $rootScope, $stateParams, $state, $location, $Event, $TicketType) {
    $scope.event = {};
    $scope.event.id = $stateParams.id;

    //Active Pages
    $scope.active = {};
    $scope.getPage = function (state) {
        if (state == "app.event.home") {
            $scope.active = {};
            $scope.active.home = true;
        } else if (state == "app.event.about") {
            $scope.active = {};
            $scope.active.about = true;
        } else if (state == "app.event.location") {
            $scope.active = {};
            $scope.active.location = true;
        } else if (state == "app.event.tickets") {
            $scope.active = {};
            $scope.active.tickets = true;
        }
    }

    $scope.getPage($state.current.name);
    $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $scope.getPage(toState.name);
    });
    //End Active Pages

    //Get event
    $Event.publicGet($stateParams.id).then(function (data) {
            $scope.event = data;
            console.log(data);
        },
        function (error) {
            if (error.status == 404) {
                $scope.go("/error");
            }
        }
    );
    //End get event

    $scope.isSameDay = function (startDate, endDate) {
        var start = new Date(startDate);
        var end = new Date(endDate);

        return start.toLocaleDateString() == end.toLocaleDateString();
    }

    //Ticket Types
    $TicketType.getByEvent($stateParams.id).then(function (data) {
            $scope.ticketTypes = data;
            console.log(data);
            $scope.qty = [];
            for (var i = 0; i < $scope.ticketTypes.length; i++) {
                $scope.qty[i] = 0;
            }
        },
        function (error) {
            console.log(error);
        }
    );

});