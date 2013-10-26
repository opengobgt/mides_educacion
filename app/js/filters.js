'use strict';

/* Filters */

angular.module('SAE.filters', [])

.filter('interpolate', ['version', function(version) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  }
}]);
