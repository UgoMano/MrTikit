'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # EventManageCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventManageCtrl', function ($scope, $Event, $stateParams, $mdToast) {
    console.log('eventManage');
    $scope.setEvent($stateParams.eventId);
    $scope.event = {};
    $scope.eventPromise = $Event.get($scope.curEventId, $scope.user.loginKey);
    $scope.eventPromise.then(function(event){
        $scope.event = event;
        $scope.event.startDateTimeDateTime = new Date(event.startDateTime);
        $scope.event.startDateTimeDateTime = new Date(event.startDateTime);
        $mdToast.showSimple('Event Load: Success');
        console.log(JSON.stringify($scope.event,null,'\t'));
    },function(error) {
        console.log(error);
        $mdToast.showSimple('Event Load: Error');
    });
    $scope.updateEvent = function () {
        var rv = $Event.update($scope.user.loginKey, $scope.event.title, $scope.user.id, $scope.event.paypal_email, $scope.user.paypal, $scope.event.date, null);
        rv.then(function (e) {
            console.log(e);
        }, function (error) {
            consol.log(error);
        });
    };
});