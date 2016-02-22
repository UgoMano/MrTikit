'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('LandingCtrl', function ($scope, $http) {
    console.log('landing')
    $scope.createEvent = function () {
        console.log('Create Event');
    }
    $scope.tour = []
    $http.get('copy/landing.json').success(function (data){
        $scope.tour = data.tour;
    });
    $scope.tourIndex = 0;
    $scope.prev = function () {
        console.log('prev');
        if ($scope.tourIndex === 0) {
            $scope.tourIndex = $scope.tour.length - 1;
        } else {
            $scope.tourIndex = $scope.tourIndex - 1;
        }
        console.log($scope.tourIndex);
    }
    $scope.next = function () {
        console.log('next');
        $scope.tourIndex = ($scope.tourIndex + 1) % $scope.tour.length;
        console.log($scope.tourIndex);
    }
    $scope.learnMore = function () {
        console.log('Learn More: ' + $scope.tour[$scope.tourIndex].title);
    }
    $scope.subscribe = function (email) {
        console.log('Subscribe: ' + email);
    }
});