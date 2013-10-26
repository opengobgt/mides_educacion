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
  .controller('SetupCtrl', ['$scope', 'Department', 'Town', 'User', '$location', function($scope, Department, Town, User, $location){
    if (User.isLoggedIn == false) {
        $location.path('/login');
    }

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
  }])
  .controller('LoginCtrl', ['$scope', 'Sesion', '$location', 'User', function($scope, Sesion, $location, User){
    $scope.data = {};
    $scope.email = '';
    $scope.password = '';
    $scope.failed = false;
    $scope.login = function(){
        Sesion.iniciar( {email: $scope.email, password: $scope.password}, function(response){          
            $scope.data.usuario = response;
            $scope.failed = false;
            
            User.isLoggedIn = true;
            User.nombre = response.nombre;
            User.departamento = response.departamento;
            User.municipio = response.municipio;
            User.escuelas = response.escuelas;

            console.log(User);

            $location.path('/setup');
        },
        function(response){
            $scope.failed = true;
        })
    }
  }])
  .controller('AttendanceCtrl', ['$scope', function($scope, Attendance) {
  }]);
