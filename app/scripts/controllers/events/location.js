'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventLocationCtrl
 * @description
 * # EventLocationCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventLocationCtrl', function ($scope, $stateParams) {
    $scope.map = {
        center: { 
            latitude: 39.956091,
            longitude: -75.188024
        },
        zoom: 17,
        marker: {
            latitude: 39.956091,
            longitude: -75.188024
        }
    };
});