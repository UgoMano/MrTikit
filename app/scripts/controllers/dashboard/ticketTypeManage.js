'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:TicketTypeManageCtrl
 * @description
 * # TicketTypeManageCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('TicketTypeManageCtrl', function ($scope, $TicketType, $stateParams, $mdToast) {
    $scope.setEvent($stateParams.eventId);
    $scope.ticketTypes = [{id:1, event: 42,name: 'gen admin' , maxTicket: 34 },{id:2, event: 42,name: 'vip' , maxTicket: 12 }];
    /*$scope.createTicketType = function () {
        $scope.ticketType.eventId = $scope.curEventId;
        var createTTPromise = $TicketType.create($scope.user.loginKey, $scope.ticketType);
        createTTPromise.then(function (ticketType) {
            $mdToast.showSimple('Create ticket type success');
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
    };*/
});