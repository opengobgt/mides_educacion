'use strict';

/* Services */


// Demonstrate how to register services
angular.module('SAE.services', ['ngResource'])
  .factory('Student', function($resource){
    //return $resource('http://api.mides.gob.gt/v1/educacion/estudiantes.json', {});
    return $resource('http://localhost:3000/v1/educacion/estudiantes.json', {});
})

  .factory('School', function($resource){
    //return $resource('http://api.mides.gob.gt/v1/educacion/school.json', {});
    return $resource('http://localhost:3000/v1/educacion/escuelas.json', {});
})

  .factory('Department', function($resource){
  //return $resource('http://api.mides.gob.gt/v1/educacion/departamentos.json', {});
  return $resource('http://localhost:3000/v1/departamentos.json', {});
})

  .factory('Town', function($resource){
  //return $resource('http://api.mides.gob.gt/v1/departamentos/:id/municipios.json', {});
  return $resource('http://localhost:3000/v1/departamentos/:id/municipios.json', {}, {
    schools: {method: 'GET', url: 'http://localhost:3000/v1/departamentos/:id/municipios/:town_id/escuelas.json', isArray: true}});
})

  .factory('Sesion', function($resource){
    return $resource('http://localhost:3000/v1/sesion', {}, {
        iniciar: {method: 'POST'}
    });
})

  .factory('Asistencia', function($resource) {
    return $resource('http://localhost:3000/v1/educacion/estudiantes/:estudiante_id/asistencias', {}, {
      directSave: {url: 'http://localhost:3000/v1/asistencias', method: 'POST'}
    });
  })

  .factory('StudentsBySchool', function($resource) {
    return $resource('http://localhost:3000/v1/educacion/escuelas/:escuela_id/estudiantes.json', {});
  })

  .factory('User', function() {
     return {
          isLoggedIn: false,
          id: 0,
          nombre: '',
          departamento: {},
          municipio: [],
          escuelas: [],
          escuela: {}
      };
}).value('version', '0.1');
