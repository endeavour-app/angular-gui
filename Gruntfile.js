/**
Copyright (c) 2017 Callan Peter Milne

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
**/

const BANNER = `/**
 * Endeavour App GUI
 * v<%= pkg.version %> built on <%= grunt.template.today("yyyy-mm-dd") %>
 *
 * Copyright (c) 2017 Callan Peter Milne
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose
 * with or without fee is hereby granted, provided that the above copyright notice
 * and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
 * OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
 * TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
 * THIS SOFTWARE.
 */\n\n`;

const util = require('util');
const modRewrite = require('connect-modrewrite');

module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: BANNER,

    clean: {
      dist: ['src']
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: ['app/modules/**/*.js']
      }
    },

    exec: {
      bowerInstaller: 'bower-installer'
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      base: {
        src: [
          // Angular Project Dependencies,
          'app/app.js',
          'app/app.config.js',
          'app/modules/**/*Module.js',
          'app/modules/**/*Route.js',
          'app/modules/**/*Ctrl.js',
          'app/modules/**/*Service.js',
          'app/modules/**/*Directive.js'
        ],
        dest: 'app/assets/js/<%= pkg.name %>-appbundle.js'
      },
      build: {
        src: [
          // Angular Project Dependencies,
          'app/assets/libs/angular/angular.js',
          'app/assets/libs/**/*.js'

        ],
        dest: 'app/assets/js/<%= pkg.name %>-angularbundle.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'min'
      },
      base: {
        src: ['<%= concat.base.dest %>'],
        dest: 'app/assets/js/<%= pkg.name %>-angscript.min.js'
      },
      basePlugin: {
        src: [ 'src/plugins/**/*.js' ],
        dest: 'app/assets/js/plugins/',
        expand: true,
        flatten: true,
        ext: '.min.js'
      }
    },

    connect: {
      server: {
        options: {
          keepalive: true,
          port: 4000,
          base: '.',
          hostname: 'localhost',
          debug: true,
          livereload: true,
          open: true,
          middleware: function (connect, options, middlewares) {

            let noRewriteExts = ['html','jpg','js','svg','css','png','eot','ttf','woff','woff2','ico','txt'];
            let noRewriteRegExp = util.format('!\\.%s$', noRewriteExts.join('|\\.'));

            middlewares.unshift(modRewrite([
              util.format('%s /index.html [L]', noRewriteRegExp),
            ]));

            return middlewares;

          },
        }
      }
    },
    concurrent: {
      tasks: ['connect', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },

    watch: {
      app: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app'],
        options: {
          livereload: true
        }
      }
    },

    injector: {
      options: {},
      dev: {
        files: {
          'index.html': [
            'bower.json',
            'app/app.js',
            'app/app.config.js',
            'app/**/*Module.js',
            'app/**/*Route.js',
            'app/**/*Ctrl.js',
            'app/**/*Service.js',
            'app/**/*Directive.js'
          ]
        }
      },
      production: {
        files: {
          'index.html': [
            'app/assets/css/**/*.css',
            'app/assets/js/*.js'
          ]

        }
      }
    },

    ngtemplates: {
      app: {
        src: 'app/modules/**/*.html',
        dest: 'app/assets/js/templates.js',
        options: {
          module: 'endeavour-app',
          root: 'app/',
          standAlone: false
        }
      }
    }



  });

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Making grunt default to force in order not to break the project if something fail.
  grunt.option('force', true);

  // Register grunt tasks
  grunt.registerTask("build", [
    "jshint",
    "exec",
    "concat",
    "ngtemplates",
    "injector:production",
    "concurrent",
    "clean"
  ]);

  // Development task(s).
  grunt.registerTask('dev', ['injector:dev', 'concurrent']);

};
