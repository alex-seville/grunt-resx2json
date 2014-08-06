var xml2js = require('xml2js'),
  _ = require("underscore"),
  extend = require('xtend');

module.exports = function(grunt) {

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('resx2json', 'Convert resx to a json file.', function() {
    var tmp,options,jsonFromXml
      jsonToWrite={};

    tmp = grunt.config(['resx2json', this.target, 'options']);
    if (typeof tmp === 'object') {
      grunt.verbose.writeln('Using "' + this.target + '" resx2json options.');
      options = tmp;
    } else {
      grunt.verbose.writeln('Using master resx2json options.');
    }
    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(file){
      jsonFromXml = grunt.helper('resx2json',grunt.file.read(file.src));
      grunt.file.write(file.dest,JSON.stringify(jsonFromXml,null,'\t'));
    });
    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('File converted..');
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('resx2json', function(fileContent) {
    var parser = new xml2js.Parser(),
      resourceArr = {},
      returnObj = {};
    parser.parseString(fileContent, function (err, result) {
      if (err){
        grunt.fail.warn("error:"+err);
        return;
      } 
      _.each(result.data,function(item,key){
        returnObj[item['@'].name] = item.value;
      });
    });
    return returnObj;
  });
};