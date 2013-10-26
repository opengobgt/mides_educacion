'use strict';


// Declare app level module which depends on filters, and services
angular.module('SAE', [
  'ngRoute',
  'ngResource',
  'SAE.filters',
  'SAE.services',
  'SAE.directives',
  'SAE.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginCtrl'});
  $routeProvider.when('/students', {templateUrl: 'partials/students.html', controller: 'StudentsCtrl'});
  $routeProvider.when('/schools', {templateUrl: 'partials/schools.html', controller: 'SchoolsCtrl'});
  $routeProvider.when('/setup', {templateUrl: 'partials/setup.html', controller: 'SetupCtrl'});
  $routeProvider.when('/attendance', {templateUrl: 'partials/attendance.html', controller: 'AttendanceCtrl'});

  $routeProvider.otherwise({redirectTo: '/login'});
}]);
