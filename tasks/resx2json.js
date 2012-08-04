var xml2js = require('xml2js'),
  _ = require("underscore"),
  extend = require('xtend');

module.exports = function(grunt) {

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('resx2json', 'Convert resx to a json file.', function() {
    var tmp,options,lang,matchlang,jsonFromXml,lang_regex,
      jsonToWrite={};

    tmp = grunt.config(['resx2json', this.target, 'options']);
    if (typeof tmp === 'object') {
      grunt.verbose.writeln('Using "' + this.target + '" resx2json options.');
      options = tmp;
    } else {
      grunt.verbose.writeln('Using master resx2json options.');
      options = {
        langregex: /^.+.aspx.(\w+).resx$/g,
        concat: 'dist/output.json'
      };
    }
    grunt.verbose.writeflags(options, 'Options');

    grunt.file.expandFiles(this.file.src).forEach(function(filepath){
      matchlang = filepath.match(options.langregex);
      lang = matchlang ? RegExp.$1 : "en";
      grunt.verbose.writeln("Language prefix: "+lang);
      jsonFromXml = grunt.helper('resx2json',grunt.file.read(filepath),lang);
      if (options.concat){
        if (jsonToWrite[lang]){
          extend(jsonToWrite[lang],jsonFromXml[lang]);
        }else{
          extend(jsonToWrite, jsonFromXml);
        }
      }else{
        grunt.file.write(filepath+'.json',JSON.stringify(jsonFromXml,null,'\t'));
      }
    });
    if (options.concat){
      grunt.file.write(options.concat,JSON.stringify(jsonToWrite,null,'\t'));
    }
    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('File converted..');
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  // Concat source files and/or directives.
  grunt.registerHelper('resx2json', function(fileContent,lang) {
    var parser = new xml2js.Parser(),
      resourceArr = {},
      returnObj = {};
    parser.parseString(fileContent, function (err, result) {
        if (err){
          grunt.log.writeln("error:"+err);
          return;
        }
        var obj;
        _.each(result.data,function(item,key){
          resourceArr[item['@'].name] = item.value;
        });
    });
    returnObj[lang] = resourceArr;
    return returnObj;
  });
};