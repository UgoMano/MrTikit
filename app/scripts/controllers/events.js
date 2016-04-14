'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventsCtrl', function ($scope, $Event, $stateParams) {
    $scope.eventsPromise = $Event.getAll($scope.user.loginKey);
    $scope.eventsPromise.then(function (events) {
        //$mdToast.showSimple('success');
        //console.log(events);
        $scope.events = events;
    }, function (error) {
        $mdToast.showSimple('error');
        console.log(error);
    });
});