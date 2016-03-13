'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCtrl', function ($scope, $rootScope, $stateParams, $state, $location) {
    console.log("Event" + $stateParams.id);
    $scope.event = {};
    $scope.event.id = $stateParams.id;

    //Active Pages
    $scope.active = {};
    $scope.getPage = function (state) {
        if (state == "app.event.home") {
            $scope.active = {};
            $scope.active.home = true;
        } else if (state == "app.event.about") {
            $scope.active = {};
            $scope.active.about = true;
        } else if (state == "app.event.location") {
            $scope.active = {};
            $scope.active.location = true;
        } else if (state == "app.event.tickets") {
            $scope.active = {};
            $scope.active.tickets = true;
        }
    }

    $scope.getPage($state.current.name);
    $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $scope.getPage(toState.name);
    });
    //End Active Pages

});