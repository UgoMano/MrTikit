'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventCreateCtrl
 * @description
 * # EventCreateCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCreateCtrl', function ($scope, $User, $Event, $mdToast) {
    $scope.step;
    $scope.setStep = function (step) {
        $scope.step = step;
    }
});