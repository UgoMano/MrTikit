'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:ReviewPurchaseCtrl
 * @description
 * # ReviewPurchaseCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('ReviewPurchaseCtrl', function ($scope, $timeout, $window, $location, $Event) {
    $scope.loadComplete = false;
    $scope.tickets = [];
    $scope.trans = $location.search().trans;
    var finalizePurchase = $Event.purchaseTicket($scope.user.loginKey, $scope.trans);
    finalizePurchase.then(function (data) {
        console.log(data);
        $scope.tickets = data;
        $scope.loadComplete = true;
        $location.search('trans',null);
    }, function (error) {
        console.log(error);
    });
    $scope.view = function (id) {
        $window.open("/myTickets/" + id + "/view", '_blank');
    }
});