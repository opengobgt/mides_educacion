'use strict';

/* Controllers */

angular.module('SAE.controllers', []).
  controller('StudentsCtrl', ['$scope', 'Student', function($scope, Student) {
    $scope.data = {};
    Student.query(function(response){
      $scope.data.students = response;
    });
  }])
  .controller('SchoolsCtrl', ['$scope', 'School', function($scope, School) {
    $scope.data = {};
    School.query(function(response){
      $scope.data.schools = response;
    });
  }])
  .controller('LoginCtrl', ['$scope', 'Sesion', function($scope, Sesion){
    $scope.data = {};
    $scope.email = '';
    $scope.password = '';
    $scope.failed = false;
    $scope.login = function(){
        Sesion.iniciar( {email: $scope.email, password: $scope.password}, function(response){
            console.log( response );
            $scope.data.usuario = response;
            $scope.failed = false;
        },
        function(response){
            $scope.failed = true;
        })
    }
  }])
  .controller('AttendanceCtrl', ['$scope', function($scope, Attendance) {
  }]);
