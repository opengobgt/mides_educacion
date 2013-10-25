'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('StudentsCtrl', ['$scope', 'Student', function($scope, Student){
    $scope.data = {};
    Student.query(function(response){
      $scope.data.students = response;
    });
  }])
  .controller('SchoolsCtrl', ['$scope', 'School', function($scope, School){
    $scope.data = {};
    School.query(function(response){
      $scope.data.schools = response;
    });
  }])
  .controller('LoginCtrl', ['$scope', function($scope){
    $scope.data = {};
  }]);
