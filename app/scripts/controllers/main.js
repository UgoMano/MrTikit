'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('MainCtrl', function ($scope, $rootScope, $interval, $location, $mdSidenav, $cookieStore, $mdDialog) {
    //console.log('main')
    $rootScope.curEventId;

    $rootScope.collapsed = $cookieStore.get("collapsed");
    if($rootScope.collapsed == null) {
        $rootScope.collapsed = "";
        $cookieStore.put('collapsed', $rootScope.collapsed);
    }
    
    $rootScope.toggleCollapse = function () {
        if ($rootScope.collapsed == "collapsed") {
            $rootScope.collapsed = "";
            $cookieStore.put('collapsed', $rootScope.collapsed);
        } else if ($rootScope.collapsed == "") {
            $rootScope.collapsed = "collapsed";
            $cookieStore.put('collapsed', $rootScope.collapsed);
        }
    };

    $rootScope.go = function (path) {
        console.log("go: ", path);
        $location.path(path);
    }

    $rootScope.setEvent = function (eventId) {
        $rootScope.curEventId = eventId;
    }
    
    $scope.openUserMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
});