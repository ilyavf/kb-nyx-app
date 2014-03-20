// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine', "requirejs"],

    // list of files / patterns to load in the browser
    files: [
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-mocks/angular-mocks.js',
        'app/bower_components/angular-resource/angular-resource.js',
        'app/bower_components/angular-route/angular-route.js',
        'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'app/bower_components/jquery/dist/jquery.js',
        //'test/mock/**/*.js',

        // Karma creates webserver and it needs to know what files should be hosted.
        // However we don't want to include all the files with index.html but load them with requirejs
        // See this link for more details:
        // http://karma-runner.github.io/0.10/plus/requirejs.html
        {pattern: 'app/scripts/*.js', included: false },
        {pattern: 'app/scripts/**/*.js', included: false },
        {pattern: 'test/spec/**/*.js', included: false },

        //{pattern: 'test/spec/homepage/homeSpec.js', included: false },
        //{pattern: 'test/spec/mainCtrlSpec.js', included: false },

        'test/test-bootstrap.js'
    ],

    // list of files / patterns to exclude
    exclude: [
        'app/scripts/app-bootstrap.js'
    ],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,
    reporters: ['dots', 'junit'],
    junitReporter: {
        outputFile: 'test-results-karma.xml'
    }
  });
};
