'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # EventCreateCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCreateCtrl', function ($scope, $User, $Event, $mdToast) {
    console.log('eventCreate')
    $scope.event = {};
    $scope.$watch('event', function () {
        console.log($scope.event);
    }, true)
    $scope.createEvent = function () {
        $scope.event.owner = $scope.user.id;
        var rv = $Event.create($scope.user.loginKey, $scope.event);
        rv.then(function (event) {
            $mdToast.showSimple('Create Event Successful');
            $scope.event = event;
            $scope.go('/events/'+$scope.event.id+'/overview');
            
        }, function (error) {
            if (error.error) {
                $mdToast.showSimple(error.error);
            }
            else {
                $mdToast.showSimple(error.data.message);
            }
        });
    };

    //create(tokenKey, title, owner, paypal_email, startDateTime, endDateTime, checkIn);
});