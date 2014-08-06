grunt-resx2json
==============

Grunt task for converting .resx files into json

**Installation**  
`npm install grunt-resx2json`  
  
**Usage**  
`grunt resx2json`  
  
**Contributions**  
This task was made for a pretty specific purpose, and I'm sure there are improvments to be made to it.  
Feel free to fork and pull any useful changes you may have.  


**Fork has been hacked / simplified from original:**

	grunt.initConfig({
		foo: {
			files : [
	    		{src: 'foo.resx', dest: 'foo.json'}
	    	],
	    },

	  	bar: {
	    	files : [
	    		{src: 'bar.resx', dest: 'bar.json'}
	    		{src: 'barTwo.resx', dest: 'barTwo.json'}
	    	]
	  	}