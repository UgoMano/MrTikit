'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('MainCtrl', function ($scope) {
     console.log('main')
     $scope.createEvent = function() {
         console.log('Create Event');
     }
     $scope.tour = [{'title':'Create event', 
                     'text':'The user hits the Create Event button, then inputs the event information (e.g. name, date, time, location, photo, additional information, etc). Also, the user can specify the ticket type (e.g. General Admission, VIP, etc).'},
                    {'title':'Purchase tickets', 
                     'text':'The user enters the required information to purchase the ticket. All financial transactions will take place on the secure online payment system, Paypal.'},
                    {'title':'Access ticket on device', 
                     'text':'After the event ticket is purchased in the system, the user can access the tickets directly from their mobile devices via a QR code.'},
                    {'title':'Scan event tickets', 
                     'text':'The purchased tickets can be scanned from the user’s mobile device or a printed ticket using a mobile QR Scanner.'},
                    {'title':'View reports', 
                     'text':'Mr Tikit provides reports and statistics (e.g. demographic data, number of attendees) from past events. This data can be used by the host to make intelligent decisions concerning subsequent events.'}];
    $scope.tourIndex = 0;
    $scope.prev = function() {
        console.log('prev');
        if($scope.tourIndex ===0) {
            $scope.tourIndex = $scope.tour.length-1;
        }
        else {
            $scope.tourIndex = $scope.tourIndex-1;
        }
        console.log($scope.tourIndex);
    }
    $scope.next = function() {
        console.log('next');
        $scope.tourIndex = ($scope.tourIndex + 1) % $scope.tour.length;
        console.log($scope.tourIndex);
    }
    $scope.learnMore = function() {
        console.log('Learn More: ' +$scope.tour[$scope.tourIndex].title);
    }
    $scope.subscribe = function(email) {
        console.log('Subscribe: '+email);
    }
});