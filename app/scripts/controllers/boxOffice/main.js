'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:BoxOfficeMainCtrl
 * @description
 * # BoxOfficeMainCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('BoxOfficeMainCtrl', function ($stateParams) {
    console.log("Event" + $stateParams.id);
});