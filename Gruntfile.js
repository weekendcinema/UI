module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		// Task configuration will be written here
		clean : {
			temp : {
				src : [ 'app.js' ]
			}
		},
		concat : {
			options : {
				separator : '\n'
			},
			dist : {
				src : [ 'app/**/*.js' ],
				dest : 'app.js'
			}
		},
		express : {
			dev : {
				options : {
					script : 'server.js'
				}
			}
		},
		watch : {
			files : [ 'Gruntfile.js', 'app/**/*.js' ], //Files to be watched
			tasks : [ 'clean:temp', 'concat:dist', 'express:dev' ], //(Re)start the server
			options : { //Server options
				spawn : false
			//Must have for reload
			}
		}
	});

	// Loading of tasks and registering tasks will be written here

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('local', [ 'clean:temp', 'concat:dist', 'express:dev',
			'watch' ]);
};