'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('LoginCtrl', function ($scope, $rootScope, $User, $mdToast, $cookieStore, $location) {
    $scope.login = function () {
        if ($scope.email && $scope.password) {
            $User.login($scope.email, $scope.password).then(function (data) {
                $cookieStore.put('loginKey', data.data.data.token);
                $cookieStore.put('user', data.data.data.user);

                $rootScope.user = $cookieStore.get("user");
                $rootScope.user.loginKey = $cookieStore.get("loginKey");
                $location.path("/");
            },
            function (error) {
                if (error.error) {
                    $mdToast.showSimple(error.error);
                } else if (error.status == 401) {
                    $mdToast.showSimple(error.data.message);
                } else {
                    console.log(error);
                }
            });
        }
    }
});