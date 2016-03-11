'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCtrl', function ($stateParams) {
     console.log("Event" + $stateParams.id);
});