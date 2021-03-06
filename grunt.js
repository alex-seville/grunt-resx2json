module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    test: {
      files: ['test/*.js']
    },
    lint: {
      files: ['grunt.js', 'tasks/*.js', 'test/*.js']
    },
    resx2json: {
      files : ['templates/**/*.resx'],
      langregex: /^.+.aspx.(\w+).resx$/g,
      concat: 'dist/output.json'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    }
  });

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'lint test');

};
