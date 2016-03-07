'use strict';

/**
 * @ngdoc overview
 * @name mrtikitApp
 * @description
 * # mrtikitApp
 *
 * Main module of the application.
 */
angular.module('mrtikitApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    //'ngTouch',
    'ui.router',
    'ngMaterial',
  ]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: 'LoginCtrl'
        })

    .state('app', {
        url: "/",
        abstract: true, //This allows it to be a parent with nested urls
        templateUrl: "views/main.html",
        controller: 'MainCtrl'
    })

    .state('app.home', {
            url: "", //This fills out the home page of the main view of the app with the content
            templateUrl: "views/home.html",
            controller: 'HomeCtrl'
        })
        .state('app.myEvents', {
            url: "myEvents",
            templateUrl: "views/myEvents.html",
            controller: 'MyEventsCtrl'
        })
        .state('app.eventCreate', {
            url: "events/create",
            templateUrl: "views/eventCreate.html",
            controller: 'EventCreateCtrl'
        })
        .state('app.eventOverview', {
            url: "events/:eventId/overview",
            templateUrl: "views/eventOverview.html",
            controller: 'EventOverviewCtrl'
        })
        .state('app.eventManage', {
            url: "events/:eventId/manage",
            templateUrl: "views/eventManage.html",
            controller: 'EventManageCtrl'
        })
        .state('app.eventAttendees', {
            url: "events/:eventId/attendees",
            templateUrl: "views/eventAttendees.html",
            controller: 'EventAttendeesCtrl'
        })
        .state('app.eventReports', {
            url: "events/:eventId/reports",
            templateUrl: "views/eventReports.html",
            controller: 'EventReportsCtrl'
        })
        .state('app.eventUtilities', {
            url: "events/:eventId/utilities",
            templateUrl: "views/eventUtilities.html",
            controller: 'EventUtilitiesCtrl'
        })
    $urlRouterProvider.otherwise('/');
}).run(function ($rootScope, $state, $http, $location, $window, $timeout, $cookieStore, $User, $Event) {
    console.log($state);

    
    $User.login("test@test.com", "test12").then(function (data) {

        if (data.error) {
            //This is validation error if you are missing username or password
            console.log(data.error);
            return;
        }

        //Log the server response success/error
        console.log(data);
        $cookieStore.put('loginKey', data.data.data.token);
        $cookieStore.put('user', data.data.data.user);
        //$rootScope.loginKey = $cookieStore.get("loginKey");
        $rootScope.user = $cookieStore.get("user");
        $rootScope.user.loginKey = $cookieStore.get("loginKey");
    });
    
    $rootScope.loginKey = $cookieStore.get("loginKey");

    /*
    $User.signup("firstName", "lastName", "username", "email@test.com", "password").then(function (data) {

        if (data.error) {
            //This is validation error if you are missing username or password
            console.log(data.error);
            return;
        }

        //Log the server response success/error
        console.log(data);
    });
    */
    
    /*
    $Event.getAll($rootScope.loginKey).then(function (data) {

        if (data.error) {
            //This is validation error if you are missing username or password
            console.log(data.error);
            return;
        }

        //Log the server response success/error
        console.log(data);
    });*/
    
    
    /*
    $Event.get(1, $rootScope.loginKey).then(function (data) {

        if (data.error) {
            //This is validation error if you are missing username or password
            console.log(data.error);
            return;
        }

        //Log the server response success/error
        console.log(data);
    });
    */
    
    /*
    $Event.create($rootScope.loginKey, "title", 1,  null, null, null, null).then(function (data) {

        if (data.error) {
            //This is validation error if you are missing username or password
            console.log(data.error);
            return;
        }

        //Log the server response success/error
        console.log(data);
    });*/
    
    /*
    $Event.update(2, $rootScope.loginKey, "Test Event 2", 1,  null, null, null, null).then(function (data) {

        if (data.error) {
            //This is validation error if you are missing username or password
            console.log(data.error);
            return;
        }

        //Log the server response success/error
        console.log(data);
    });*/
    
    
});

/** 
 * Global Variables
 *
 **/

var SERVER_URL = "http://54.69.160.45:8000";