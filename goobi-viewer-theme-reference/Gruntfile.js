module.exports = function(grunt) {
    grunt.initConfig({
        theme: {
            name: 'reference'
        },
        pkg: grunt.file.readJSON('package.json'),
        src: {
            jsDevFolder: 'src/META-INF/resources/resources/themes/<%=theme.name%>/javascript/dev/',
            jsDistFolder: 'src/META-INF/resources/resources/themes/<%=theme.name%>/javascript/dist/',
            lessDevCsFolder: 'src/META-INF/resources/resources/themes/<%=theme.name%>/css/less/cs/',
            lessDevViewerFolder: 'src/META-INF/resources/resources/themes/<%=theme.name%>/css/less/viewer/',
            cssDevFolder: 'src/META-INF/resources/resources/themes/<%=theme.name%>/css/dev/',
            cssDistFolder: 'src/META-INF/resources/resources/themes/<%=theme.name%>/css/dist/'
        },
        less: {
            development: {
                options: {
                    paths: [ '<%=src.lessDevViewerFolder%>', '<%=src.lessDevCsFolder%>' ],
                    compress: false,
                    optimization: 9
                },
                files: {
                    '<%=src.cssDevFolder %><%=theme.name%>.css': '<%=src.lessDevViewerFolder%>constructor.less',
                    '<%=src.cssDevFolder %><%=theme.name%>-cs.css': '<%=src.lessDevCsFolder%>csConstructor.less',
                }
            },
            production: {
                options: {
                    paths: [ '<%=src.lessDevViewerFolder%>', '<%=src.lessDevCsFolder%>'  ],
                    compress: true,
                    banner: '/*!\n ============================================================\n <%= pkg.name %> \n\n Version: <%= pkg.version %> \n License: <%= pkg.license %> \n Author: <%= pkg.author %> \n Description: <%= pkg.description %> \n ============================================================ \n*/',
                },
                files: {
                    '<%=src.cssDistFolder %><%=theme.name%>.min.css': '<%=src.lessDevViewerFolder%>constructor.less',
                    '<%=src.cssDistFolder %><%=theme.name%>-cs.min.css': '<%=src.lessDevCsFolder%>csConstructor.less',
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    '<%=src.jsDistFolder %>custom.min.js': ['<%=src.jsDevFolder %>custom.js']
                }
            }
        },
        watch: {
            styles: {
                files: [ 'src/META-INF/resources/resources/themes/<%=theme.name%>/css/**/*.less' ],
                tasks: [ 'less' ],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: [ '<%=src.jsDevFolder %>*.js' ],
                tasks: [ 'uglify' ],
                options: {
                    nospawn: true
                }
            }
        }
    });
    
    // load tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    // register tasks
    grunt.registerTask( 'default', [ 'watch' ] );
};