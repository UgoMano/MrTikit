'use strict';

/**
 * @ngdoc function
 * @name mrtikitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mrtikitApp
 */
angular.module('mrtikitApp').controller('MainCtrl', function ($scope, $rootScope, $interval, $location, $mdSidenav, $cookieStore, $mdDialog, $User) {
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
        //console.log("go: ", path);
        $location.path(path);
    }

    $rootScope.setEvent = function (eventId) {
        $rootScope.curEventId = eventId;
    }
    
    $scope.openUserMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };

    if (!$cookieStore.get("user") || !$cookieStore.get("loginKey")) {
        $location.path("/login");
    } else {
        $rootScope.user = $cookieStore.get("user");
        $rootScope.user.loginKey = $cookieStore.get("loginKey");
        $rootScope.user.loginType = $cookieStore.get("loginType");
    }

    if($rootScope.user.loginType == "facebook") {
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                //console.log(response);
            } else {
                console.log(response);
            }
        });
    }

    //confirm user is good to go
    $User.ping($rootScope.user.loginKey).then(function (data) {
        //This shouldn't do anything
    },
    function (error) {
        if(error.data.message == "invalid token") {
            console.log("Invalid Token");
    
            $rootScope.user = null;
            
            $cookieStore.remove("user")
            $cookieStore.remove("loginKey");
            $cookieStore.remove("loginType");
            
            $location.path("/login");
        } else if(error.data.message == "jwt expired") {
            console.log("Expired User");
            
            $rootScope.user = null;
            
            $cookieStore.remove("user")
            $cookieStore.remove("loginKey");
            $cookieStore.remove("loginType");
            
            $location.path("/login");
        } else {
            console.log(error);
        }
    });

    console.log($rootScope.user);

    //If profile picture is empty fill it
    $scope.profilePicture = function() {
        if(!$rootScope.user.photo) {
            return "images/defaultUser.png";
        }
        return $rootScope.user.photo
    }

    $scope.userName = function() {
        if(!$rootScope.user.firstName || !$rootScope.user.lastName) {
            return $rootScope.user.email;
        }
        return $rootScope.user.firstName + " " + $rootScope.user.lastName;
    }

});
/*
.directive('noProfilePic', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', "");
        }
      });
    }
  }
});*/