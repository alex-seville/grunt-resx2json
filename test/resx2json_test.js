var grunt = require('grunt');

exports['dotnetresources'] = {
  setUp: function(done) {
    done();
  },
  tearDown: function(done) {
    done();
  },
  'helper xmltojson': function(test) {
    test.expect(2);
    // tests here
    var file = grunt.file.read(grunt.file.expandFiles("test/fixtures/demofile.resx"));
    var result = grunt.helper('resx2json',file);
    test.equal(typeof result,"object");
    test.ok(true,"done.");
    test.done();
  }
};
