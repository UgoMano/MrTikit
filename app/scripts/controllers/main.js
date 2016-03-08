'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('MainCtrl', function ($scope, $rootScope, $interval, $location, $mdSidenav) {
    //console.log('main')
    $rootScope.curEventId;

    //TODO: Make this pull from cookies
    $rootScope.collapsed = "";
    
    $rootScope.toggleCollapse = function () {
        if ($rootScope.collapsed == "collapsed") {
            $rootScope.collapsed = "";
        } else if ($rootScope.collapsed == "") {
            $rootScope.collapsed = "collapsed";
        }
    };

    $rootScope.go = function (path) {
        console.log("go: ", path);
        $location.path(path);
    }

    $rootScope.setEvent = function (eventId) {
        $rootScope.curEventId = eventId;
    }
});