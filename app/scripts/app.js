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
       url: "events/:eventID/manage",
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
}).run(function ($rootScope, $state, $http, $location, $window, $timeout) {
    console.log($state);
});