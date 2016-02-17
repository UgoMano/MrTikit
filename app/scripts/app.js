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
    'ngTouch',
    'ui.router',
    'ui.scrollpoint',
  ]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: "/",
        templateUrl: "views/landing.html",
        controller: 'LandingCtrl'
    })

    .state('about', {
        url: "/about",
        templateUrl: "views/about.html",
        controller: 'AboutCtrl'
    })

    $urlRouterProvider.otherwise('/');
}).run(function ($rootScope, $state, $http, $location, $window, $timeout) {
    console.log($state);
});