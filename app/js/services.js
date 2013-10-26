'use strict';

/* Services */


// Demonstrate how to register services
angular.module('SAE.services', ['ngResource'])
  .factory('Student', function($resource){
    //return $resource('http://api.mides.gob.gt/v1/educacion/estudiantes.json', {});
    return $resource('http://localhost:3000/v1/educacion/estudiantes.json', {});
}).value('version', '0.1')

  .factory('School', function($resource){
    //return $resource('http://api.mides.gob.gt/v1/educacion/school.json', {});
    return $resource('http://localhost:3000/v1/educacion/escuelas.json', {});
}).value('version', '0.1')

  .factory('Department', function($resource){
  //return $resource('http://api.mides.gob.gt/v1/educacion/departamentos.json', {});
  return $resource('http://localhost:3000/v1/departamentos.json', {});
}).value('version', '0.1')

  .factory('Town', function($resource){
  //return $resource('http://api.mides.gob.gt/v1/departamentos/:id/municipios.json', {});
  return $resource('http://localhost:3000/v1/departamentos/:id/municipios.json', {}, {
    schools: {method: 'GET', url: 'http://localhost:3000/v1/departamentos/:id/municipios/:town_id/escuelas.json', isArray: true}});
}).value('version', '0.1')

  .factory('Sesion', function($resource){
    return $resource('http://localhost:3000/v1/sesion', {}, {
        iniciar: {method: 'POST'}
    });
}).value('version', '0.1')

  .factory('Attendance', function($resource) {
}).value('version', '0.1')

  .factory('User', function() {
     return {
          isLoggedIn: false,
          nombre: '',
          departamento: {},
          municipio: [],
          escuelas: []
      };
}).value('version', '0.1')
;

