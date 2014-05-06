module.exports = function(grunt) {

	// Task Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// LESS Compiler
		less: {
			development: {
				options: {
				  compress: false
				},
				files: {
				  "build/assets/css/style.css": "src/less/style.less"
				}
			},
			production: {
				options: {
					cleancss: true,
				},
				files: {
				  "build/assets/css/style.css": "src/less/style.less"
				}
			}
		},

		// File Monitoring
		watch: {
			css: {
			    files: ['src/less/*.less'],
			    tasks: ['less:development'],
			    options: {
			        spawn: false,
			    }
			}
		}
	});

	// Task Loading
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Task Registering
	grunt.registerTask('default', ['watch']);
};
