'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # EventCreateCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCreateCtrl', function ($scope, $User, $Event) {
    console.log('eventCreate')
    $scope.event = {};
    $scope.$watch('event', function () {
        console.log($scope.event);
    }, true)
    $scope.createEvent = function () {
        var rv = $Event.create($scope.user.loginKey, $scope.event.title, $scope.user.id, $scope.event.paypal_email, $scope.user.paypal, $scope.event.date, null);
        rv.then(function (e) {
            console.log(e);
        },function(error) {
            consol.log(error);
        });
    };

    //create(tokenKey, title, owner, paypal_email, startDateTime, endDateTime, checkIn);
});