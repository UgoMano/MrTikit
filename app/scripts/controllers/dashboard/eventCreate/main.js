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
        if(!$scope.validate()) {
            return;
        }
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
        if($state.current.name == 'dashboard.eventCreate.new') {
            $scope.go('/dashboard/events/create');
        }
        if($state.current.name == 'dashboard.eventCreate.ticketTypes') {
            $scope.go('/dashboard/events/create/'+$scope.curEventId+'/edit');
        }
        if($state.current.name == 'dashboard.eventCreate.publish') {
            $scope.go('/dashboard/events/create/'+$scope.curEventId+'/ticketTypes');
        }
        
    }
    $scope.validate=function() {
        return false;
    }
    $scope.setValidate = function(f) {
        $scope.validate = f;
    }
});