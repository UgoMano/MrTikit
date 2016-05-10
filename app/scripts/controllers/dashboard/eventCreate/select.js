'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:EventCreateSelectCtrl
 * @description
 * # EventCreateSelectCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('EventCreateSelectCtrl', function ($scope, $User, $Event, $mdToast, $filter,Facebook) {
    $scope.setStep(0);
    $scope.events = [];
    $scope.unpublished = [];
    $scope.fbevents = [];
    $scope.fbpublised = [];
    $scope.fbunpublished = [];
    $scope.fbonly = [];
    $scope.eventsPromise = $Event.getAll($scope.user.loginKey);
    $scope.eventsPromise.then(function (events) {
        //$mdToast.showSimple('success');
        console.log(events);
        $scope.events = events;
        $scope.unpublished = $filter('filter')(events, {
            published: false
        });
    }, function (error) {
        $mdToast.showSimple('error');
        console.log(error);
    });
    Facebook.getLoginStatus(function (response) {
        console.log(response.authResponse.accessToken);

        if (response.status === 'connected') {
            $User.getFacebookEvents($scope.user.facebookId, response.authResponse.accessToken).then(function (data) {
                    console.log(data);
                    $scope.fbevents=data.data.data;
                    console.log(JSON.stringify($scope.fbevents,null,' '));
                },
                function (error) {
                    if (error.error) {
                        $mdToast.showSimple(error.error);
                    } else if (error.status == 401) {
                        //$mdToast.showSimple(error.data.message);
                        console.log(error);
                    } else {
                        console.log(error);
                    }
                });
        }
    });
});