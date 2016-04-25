'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventCreateSelectCtrl
 * @description
 * # EventCreateSelectCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCreateSelectCtrl', function ($scope, $User, $Event, $mdToast, $filter) {
    $scope.setStep(0);
    $scope.events = [];
    $scope.unpublished = [];
    $scope.fbevents = [];
    $scope.fbpublised = [];
    $scope.fbunpublished = [];
    $scope.fbonly = [];
    $scope.eventsPromise = $Event.getAll($scope.user.loginKey);
    $scope.eventsPromise.then(function (events) {
        //$mdToast.showSimple('success');
        console.log(events);
        $scope.events = events;
        $scope.unpublished = $filter('filter')(events, { published: false});
    }, function (error) {
        $mdToast.showSimple('error');
        console.log(error);
    });
});