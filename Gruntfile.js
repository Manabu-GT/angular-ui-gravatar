'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var karmaConfig = function (configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var travisOptions = process.env.TRAVIS && { browsers: [ 'Firefox', 'PhantomJS'], reporters: ['dots'] };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    distdir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
      ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
    src: {
      js: ['src/**/*.js'],
      specs: ['test/*.spec.js']
    },

    // Empties folders to start fresh
    clean: ['<%= distdir %>/*'],

    // Test settings
    karma: {
      unit: { options: karmaConfig('test/config/karma.conf.js') },
      watch: { options: karmaConfig('test/config/karma.conf.js', { singleRun: false, autoWatch: true}) }
    },

    watch: {
      all: {
        files: ['<%= src.js %>', '<%= src.specs %>'],
        tasks: ['default', 'timestamp']
      },
      build: {
        files: ['<%= src.js %>', '<%= src.specs %>'],
        tasks: ['build', 'timestamp']
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'gruntFile.js',
        '<%= src.js %>'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: [
          '<%= src.specs %>'
        ]
      }
    },

    concat: {
      dist: {
        options: {
          banner: '<%= banner %>'
        },
        src: '<%= src.js %>',
        dest: '<%= distdir %>/<%= pkg.name %>.js'
      }
    },

    uglify: {
      dist: {
        options: {
          banner: '<%= banner %>'
        },
        src: '<%= concat.dist.dest %>',
        dest: '<%= concat.dist.dest %>'
      }
    },

    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    }

  });

  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function () {
    grunt.log.subhead(Date());
  });

  // Test the directive
  grunt.registerTask('test', ['jshint', 'karma:unit']);
  grunt.registerTask('build', ['clean', 'concat']);
  grunt.registerTask('release', ['clean', 'concat', 'uglify']);
  grunt.registerTask('default', ['test', 'build']);
};
