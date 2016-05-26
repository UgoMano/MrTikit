'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventTicketsCtrl
 * @description
 * # EventTicketsCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventTicketsCtrl', function ($stateParams, $scope, $mdToast, $Event, $location, $window) {
    $scope.$watchCollection('qty', function () {
        if ($scope.qty) {
            for (var i = 0; i < $scope.qty.length; i++) {
                if ($scope.qty[i] > 0) {
                    $scope.ticketType = i;
                    break;
                } else {
                    $scope.ticketType = -1;
                }
            }
        }
    });

    $scope.validTicket = function (index) {
        if ($scope.ticketType >= 0) {
            if ($scope.ticketType == index) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    $scope.purchaseTicket = function () {
        if ($scope.ticketType < 0) {
            $mdToast.showSimple("Please choose a Ticket Type");
            return;
        }
        if (!$scope.user) {
            $mdToast.showSimple("Please Login");
            return;
        }

        var ticketTypeId = $scope.ticketTypes[$scope.ticketType].id;
        var qty = $scope.qty[$scope.ticketType];


        //hold ticket then purchase
        $Event.holdTicket($scope.user.loginKey, $stateParams.id, ticketTypeId, qty).then(function (data) {
            console.log(data);
            $window.location = data.data[0].remoteUrl + data.data[0].payKey;
                
            },
            function (error) {
                $mdToast.showSimple("Error holding ticket");
                console.log(error);
            }
        );
    }
});