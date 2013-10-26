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
  .controller('SetupCtrl', ['$scope', 'Department', 'Town', function($scope, Department, Town){
    $scope.data = {};
    $scope.department = '';
    $scope.town = '';
    $scope.school = '';
    
    $scope.step = 'department';
    
    Department.query(function(response){
      $scope.data.departments = response;
    });
    
    $scope.towns = function(){
      $scope.step = 'town';
      Town.query({id: $scope.department.id}, function(response){
        $scope.data.towns = response;
      });
    }
    
    $scope.schools = function(){
      $scope.step = 'school';
      Town.schools({id: $scope.department.id, town_id: $scope.town.id}, function(response){
        $scope.data.schools = response;
      });
    }
  }]);
