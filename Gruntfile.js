module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
      scripts: {
        files: ['app/lib/angular/angular.min.js', 'app/lib/angular/angular-route.min.js', 'app/lib/angular/angular-resource.min.js', 'app/js/app.js', 'app/js/filters.js', 'app/js/directives.js', 'app/js/services.js', 'app/js/controllers.js', 'app/js/jquery.1.10.2.min.js', 'app/css/pure-min.css', 'app/css/app.css', 'app/css/login.css'],
        tasks: ['uglify', 'cssmin']
      }
    },
    uglify: {
      my_target: {
        files: {
          'app/js/production.js': ['app/lib/angular/angular.min.js', 'app/lib/angular/angular-route.min.js', 'app/lib/angular/angular-resource.min.js', 'app/js/app.js', 'app/js/filters.js', 'app/js/directives.js', 'app/js/services.js', 'app/js/controllers.js', 'app/js/jquery.1.10.2.min.js'],
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'app/css/production.css': ['app/css/pure-min.css', 'app/css/app.css']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin']);
};
