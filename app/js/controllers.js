'use strict';

/* Controllers */

angular.module('SAE.controllers', [])

.controller('StudentsCtrl', ['$scope', 'Student', function($scope, Student) {
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

  $scope.save = function(){
    User.escuelas = [$scope.school];
    User.departamento = $scope.department;
    User.municipio = $scope.town;

    $location.path('/attendance');
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
      User.id = response.id
      User.nombre = response.nombre;
      User.password = $scope.password;
      User.departamento = response.departamento;
      User.municipio = response.municipio;
      User.escuelas = response.escuelas;

      $location.path('/attendance');
    },
    function(response){
      if ($scope.failed)
      {
        $('#login-failure').slideUp();
        $('#login-failure').slideDown();
      }
      else
        $scope.failed = true;
    })
  }
}])

.controller('AttendanceCtrl', ['$scope', '$http', 'User', 'StudentsBySchool', 'Asistencia', function($scope, $http, User, StudentsBySchool, Asistencia) {
  $scope.status = {
    text: 'Entrega Pendiente',
    class: 'blood_red'
  };

  // All prereqs
  var current_user = null;
  if (User.isLoggedIn)
    var current_user = User;
  else
    var current_user = { id: 1, escuelas: [{id: '16-03-0025-43'}], nombre: 'Bono', password: 'PassPrueba'};

  // Assume only one school for now
  StudentsBySchool.query({escuela_id: current_user.escuelas[0].id}, function(student_list) {
    $scope.students = student_list;
    angular.forEach($scope.students, function(student) {
      student.checked = false;
    });
  });

  $scope.selectStudent = function(student, $event) {
    this.student.checked = this.student.checked ? false : true;

    if ($event.stopPropagation) $event.stopPropagation();
    if ($event.preventDefault) $event.preventDefault();
    $event.cancelBubble = true;
    $event.returnValue = false;
  };

  $scope.submitAttendance = function() {
    var grados = [];
    angular.forEach($scope.students, function(student) {
      if (student.checked)
      {
        if (!(student.grado in grados))
          grados[student.grado] = [];
        grados[student.grado].push(student.id);
      }
    })

    var orig_headers = $http.defaults.headers.post;
    $http.defaults.headers.post['Access-Control-Request-Headers'] = "accept, origin, authorization";
    $http.defaults.headers.post['Authorization'] = 'Basic ' + window.btoa(current_user.nombre + ':' + current_user.password);

    angular.forEach(grados, function(estudiantes_ids, grado) {
      var nueva_asistencia = {};
      nueva_asistencia.escuela_id = current_user.escuelas[0].id;
      nueva_asistencia.usuario_id = current_user.id;

      nueva_asistencia.grado = grado;
      nueva_asistencia.estudiantes_ids = estudiantes_ids;
      Asistencia.directSave(nueva_asistencia);
    });

    $http.defaults.headers.post = orig_headers;
    $scope.status.text = 'Entregado';
    $scope.status.class = 'happy_green';
    $(window).scrollTop(0);
  };
}]);
