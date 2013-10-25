'use strict';

/* Services */


// Demonstrate how to register services
angular.module('myApp.services', ['ngResource'])
  .factory('Student', function($resource){
    //return $resource('http://api.mides.gob.gt/v1/educacion/estudiantes.json', {});
    return $resource('http://localhost:3000/v1/educacion/estudiantes.json', {});
})
  .value('version', '0.1')
  .factory('School', function($resource){
    //return $resource('http://api.mides.gob.gt/v1/educacion/estudiantes.json', {});
    return $resource('http://localhost:3000/v1/educacion/escuelas.json', {});
}).value('version', '0.1');