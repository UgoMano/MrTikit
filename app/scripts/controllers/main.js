'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('MainCtrl', function ($scope,$rootScope, $interval) {
     console.log('main')
     if($rootScope.collapsed==null)
         $rootScope.collapsed=false;
     $rootScope.toggleCollapse = function() {
         $rootScope.collapsed= !$rootScope.collapsed;
         console.log("collapsed: ",$rootScope.collapsed);
     };
    //$interval($scope.toggleCollapse,1000);
});