'use strict';

/* Services */

var host = null;
if (window.location.host.match('localhost'))
  host = 'localhost:3000';
else
  host = 'api.mides.gob.gt';

angular.module('SAE.services', ['ngResource'])
.factory('Student', ['$resource', function($resource){
  return $resource('http://' + host + '/v1/educacion/estudiantes.json', {});
}])

.factory('School', ['$resource', function($resource){
  return $resource('http://' + host + '/v1/educacion/escuelas.json', {});
}])

.factory('Department', ['$resource', function($resource){
  return $resource('http://' + host + '/v1/departamentos.json', {});
}])

.factory('Town', ['$resource', function($resource){
  return $resource('http://' + host + '/v1/departamentos/:id/municipios.json', {}, {
    schools: {method: 'GET', url: 'http://' + host + '/v1/departamentos/:id/municipios/:town_id/escuelas.json', isArray: true}});
}])

.factory('Sesion', ['$resource', function($resource){
  return $resource('http://' + host + '/v1/sesion', {}, {
    iniciar: {method: 'POST'}
  });
}])

.factory('Asistencia', ['$resource', function($resource) {
  return $resource('http://' + host + '/v1/educacion/estudiantes/:estudiante_id/asistencias', {}, {
    directSave: {url: 'http://' + host + '/v1/educacion/asistencias', method: 'POST', isArray: true}
  });
}])

.factory('StudentsBySchool', ['$resource', function($resource) {
  return $resource('http://' + host + '/v1/educacion/escuelas/:escuela_id/estudiantes.json', {});
}])

.factory('User', function() {
  return {
    isLoggedIn: false,
    id: 0,
    nombre: '',
    password: '',
    departamento: {},
    municipio: [],
    escuelas: [],
    escuela: {}
  };
}).value('version', '0.1');
