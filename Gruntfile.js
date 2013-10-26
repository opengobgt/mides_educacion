module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'app/js/production.js': ['app/lib/angular/angular.min.js', 'app/lib/angular/angular-route.min.js', 'app/lib/angular/angular-resource.min.js', 'app/js/app.js', 'app/js/filters.js', 'app/js/directives.js', 'app/js/services.js', 'app/js/controllers.js', 'app/js/jquery.1.10.2.min.js'],
          'app/js/test.js': ['app/js/services.js']
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'app/css/production.css': ['app/css/app.css', 'app/css/login.css']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin']);
};
