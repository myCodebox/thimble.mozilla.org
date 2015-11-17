module.exports = function( grunt ) {
  // Make grunt auto-load 3rd party tasks
  // and show the elapsed time of each task when
  // it runs
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    checkBranch: 'grunt-npm',
    gitadd: 'grunt-git'
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),

     requirejs: {
      dist: {
        options: {
          waitSeconds: 120,
          appDir: "./public/editor/scripts/",
          baseUrl: "./editor/js",
          dir: "./dist",
          modules: [{
            name: "../../main"
          }],
          findNestedDependencies: true,
          optimizeCss: "none",
          removeCombined: true,
          paths: {
            "bowser": "../../../../resources/scripts/vendor/bowser",
            "sso-override": "../../sso-override",
            "logger": "../../logger",
            "jquery": "../../../../../bower_components/jquery/index",
            "localized": "../../../../../bower_components/webmaker-i18n/localized",
            "uuid": "../../../../../bower_components/node-uuid/uuid",
            "cookies": "../../../../../bower_components/cookies-js/dist/cookies",
            "project": "../../project/project",
            "PathCache": "../../path-cache",
            "constants": "../../constants",
            "EventEmitter": "../../../../../bower_components/eventEmitter/EventEmitter.min",
            "analytics": "../../../../../bower_components/webmaker-analytics/analytics"
          },
          shim: {
            "jquery": {
              exports: "$"
            }
          },
          optimize: 'uglify2',
          preserveLicenseComments: false,
          useStrict: true,
          uglify2: {}
        }
      }
    },

    // Linting
    lesslint: {
      src: [
        "./public/editor/stylesheets/*.less",
        "./public/editor/stylesheets/*.css",
        "./public/homepage/stylesheets/*.less",
        "./public/homepage/stylesheets/*.css",
        "./public/resources/remix/*.less",
        "./public/resources/tutorial/*.less",
        "./public/resources/tutorial/*.css"
      ],
      options: {
        csslint: {
          "duplicate-properties": false,
          "duplicate-background-images": false,
          "display-property-grouping": false,
          "fallback-colors": false,
          "adjoining-classes": false,
          "box-model": false,
          "box-sizing": false,
          "bulletproof-font-face": false,
          "compatible-vendor-prefixes": false,
          "floats": false,
          "font-sizes": false,
          "ids": false,
          "important": false,
          "outline-none": false,
          "overqualified-elements": false,
          "qualified-headings": false,
          "regex-selectors": false,
          "star-property-hack": false,
          "underscore-property-hack": false,
          "universal-selector": false,
          "unique-headings": false,
          "unqualified-attributes": false,
          "vendor-prefix": false,
          "zero-units": false
        }
      }
    },
    jshint: {
      server: {
        options: {
          jshintrc: './.jshintrc'
        },
        files: {
          src: [
            "Gruntfile.js",
            "app.js",
            "lib/**/*.js",
            "routes/**/*.js"
          ]
        }
      },
      frontend: {
        options: {
          jshintrc: './.jshintrc'
        },
        files: {
          src: [
            "public/editor/**/*.js",
            "public/homepage/**/*.js",
            "public/resources/remix/index.js",
            "!public/homepage/scripts/google-analytics.js",
            "!public/editor/scripts/google-analytics.js"
          ]
        }
      }
    }
  });

  grunt.registerTask( "test", [ "jshint:server", "jshint:frontend", "lesslint" ]);
  grunt.registerTask( "build", [ "test", "requirejs:dist" ]);
  grunt.registerTask( "default", [ "test" ]);
};

