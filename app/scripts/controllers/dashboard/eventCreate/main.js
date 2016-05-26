'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventCreateCtrl
 * @description
 * # EventCreateCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCreateCtrl', function ($scope, $User, $Event, $mdToast, $state) {
    $scope.step;
    $scope.setStep = function (step) {
        $scope.step = step;
    }
    $scope.next = function() {
        console.log($state.current.name);
        if($state.current.name == 'dashboard.eventCreate.edit') {
            $scope.go('/dashboard/events/create/'+$scope.curEventId+'/ticketTypes');
        }
        if($state.current.name == 'dashboard.eventCreate.ticketTypes') {
            $scope.go('/dashboard/events/create/'+$scope.curEventId+'/publish');
        }
    }
    $scope.prev = function() {
        if($state.current.name == 'dashboard.eventCreate.edit') {
            $scope.go('/dashboard/events/create');
        }
        if($state.current.name == 'dashboard.eventCreate.ticketTypes') {
            $scope.go('/dashboard/events/create/'+$scope.curEventId+'/edit');
        }
        if($state.current.name == 'dashboard.eventCreate.publish') {
            $scope.go('/dashboard/events/create/'+$scope.curEventId+'/ticketTypes');
        }
        
    }
});