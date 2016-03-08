'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('MainCtrl', function ($scope, $rootScope, $interval,$location) {
    console.log('main')
    $rootScope.curEventId;
    if ($rootScope.collapsed == null)
        $rootScope.collapsed = false;
    $rootScope.toggleCollapse = function () {
        $rootScope.collapsed = !$rootScope.collapsed;
        console.log("collapsed: ", $rootScope.collapsed);
    };
    $rootScope.go = function(path) {
        console.log("go: ",path);
        $location.path(path);
    }
    $rootScope.setEvent = function(eventId) {
        $rootScope.curEventId = eventId;
    }
});