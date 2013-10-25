'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/students', {templateUrl: 'partials/students.html', controller: 'StudentsCtrl'});
  $routeProvider.when('/schools', {templateUrl: 'partials/schools.html', controller: 'SchoolsCtrl'});
  $routeProvider.otherwise({redirectTo: '/students'});
}]);
