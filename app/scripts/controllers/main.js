'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('MainCtrl', function ($scope, $cookieStore, $rootScope, $window, $document) {
    if ($cookieStore.get("user") && $cookieStore.get("loginKey")) {
        $rootScope.user = $cookieStore.get("user");
        $rootScope.user.loginKey = $cookieStore.get("loginKey");
        $rootScope.user.loginType = $cookieStore.get("loginType");
    }
    $scope.transparentHeader = false;
    $scope.headerScroll = function (distance, element, edge) {
        // distance >= 0 means scrollpoint is hit & applied
        // distance < 0 means scrollpoint is hit & unapplied
        // undefined edge means initialized unhit / unapplied (-distance is distance from edge)
        console.log(edge + ' hit @ ' + distance);
    }

    $scope.loginOrDashboard = function () {
        if ($rootScope.user) {
            $scope.goTo = "/dashboard/myEvents";
            return "Dashboard";
        } else {
            $scope.goTo = "/login";
            return "Login";
        }
    }
});