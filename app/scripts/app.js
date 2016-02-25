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

   /*.state('app.help', {
       url: "help", //This does not have a slash infront of it like /about because the url would be //about then
       templateUrl: "views/help.html",
       controller: 'HelpCtrl'
   })
   
   .state('app.profile', {
       url: "profile", //This does not have a slash infront of it like /about because the url would be //about then
       templateUrl: "views/profile.html",
       controller: 'ProfileCtrl'
   })

   .state('app.tutors', {
       url: "tutors", //This does not have a slash infront of it like /about because the url would be //about then
       templateUrl: "views/tutors.html",
       controller: 'TutorsCtrl'
   })

   .state('app.tutorDetail', {
       url: "tutors/{tutorIndex}", //This does not have a slash infront of it like /about because the url would be //about then
       templateUrl: "views/tutor.html",
       controller: 'TutorCtrl'
   })

   .state('app.activity', {
       url: "activity", //This does not have a slash infront of it like /about because the url would be //about then
       templateUrl: "views/activities.html",
       controller: 'ActivitiesCtrl'
   })

   .state('app.activityDetail', {
       url: "activity/{activityIndex}", //This does not have a slash infront of it like /about because the url would be //about then
       templateUrl: "views/activity.html",
       controller: 'ActivityCtrl'
   })

   .state('app.locations', {
       url: "locations", //This does not have a slash infront of it like /about because the url would be //about then
       templateUrl: "views/locations.html",
       controller: 'LocationsCtrl'
   })

   .state('app.locationDetail', {
       url: "locations/{locationIndex}", //This does not have a slash infront of it like /about because the url would be //about then
       templateUrl: "views/location.html",
       controller: 'LocationCtrl'
   })*/
    /*.state('app', {
        url: "/",
        templateUrl: "views/main.html",
        controller: 'MainCtrl'
    })

    .state('app.about', {
        url: "/about",
        templateUrl: "views/about.html",
        controller: 'AboutCtrl'
    })
    */
    $urlRouterProvider.otherwise('/');
}).run(function ($rootScope, $state, $http, $location, $window, $timeout) {
    console.log($state);
});