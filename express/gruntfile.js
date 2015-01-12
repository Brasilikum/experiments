module.exports = function(grunt) {
  //var config;
  //config = require(__dirname + "/app/config/config");
  require('time-grunt')(grunt);
  /*
    Dynamically load npm tasks
    */
  require('jit-grunt')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      all: {
        files: ["Gruntfile.coffee", "public/js/**/*.js"],
        tasks: ["concat", "watch"],
        options: {
          nospawn: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: "js/bootstrap/.jshintrc"
      },
      src: {
        src: "js/bootstrap/*.js"
      }
    },
    uglify: {
      options: {
        report: "min",
        compress: {
          dead_code: true,
          drop_console: true
        }
      },
      main_script: {
        src: ["<%= concat.bootstrap.dest %>", "public/js/plugins.js", "public/js/apps.js"],
        dest: "public/assets/js/apps.min.js"
      }
    },
    cssmin: {
      combine: {
        files: {
          "public/css/apps.min.css": ["public/css/style.css"]
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: "public/img/",
            src: ["**"],
            dest: "public/assets/img"
          }, {
            expand: true,
            cwd: "public/fonts/",
            src: ["**"],
            dest: "public/assets/fonts"
          }
        ]
      }
    },
    nodemon: {
      dev: {
        script: "bin/www",
        options: {
          ignore: ["README.md", "node_modules/**", ".DS_Store", "public"],
          ext: "js",
          watch: ["routes", "views", "public", "app.js", "gruntfile.js", "package.json"],
          delayTime: 1,
          env: {
            PORT: 3003
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ["watch", "nodemon"],
      options: {
        logConcurrentOutput: true
      }
    }
  });
  grunt.registerTask('default', ['concurrent']);
  grunt.registerTask("production", ["cssmin", "copy", "concat", "uglify"]);
};