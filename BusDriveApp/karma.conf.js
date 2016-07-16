// Karma configuration
// Generated on Thu May 12 2016 11:12:41 GMT+0200 (Mitteleuropäische Sommerzeit)
'use strict';

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-coverage'),
      require('karma-mocha-reporter'),
      //require('karma-super-dots-reporter')
    ],


    // list of files / patterns to load in the browser
    files: [
      // System.js for module loading
      'node_modules/systemjs/dist/system.src.js',
      // Polyfills
      'node_modules/core-js/client/shim.js',
      // Reflect and Zone.js
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',
      // RxJs.
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },
      // lodash
      { pattern: 'node_modules/lodash/**/*.js', included: false, watched: false },
      // Angular 2 and the testing library
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },
      { pattern: 'systemjs.config.js', included: false, watched: false },
      'karma-test-shim.js',
      // Transpiled application & spec code paths loaded via module imports
      { pattern: 'build/**/*.js', included: false, watched: true },
      // Asset (HTML & CSS) paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      { pattern: 'build/**/*.html', included: false, watched: true },
      { pattern: 'build/**/*.css', included: false, watched: true },
      { pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false }, // PhantomJS2 (and possibly others) might require it
      // Paths for debugging with source maps in dev tools
      { pattern: 'app/**/*.ts', served: true, included: false, watched: false },
      { pattern: 'build/**/*.js.map', served: true,  included: false, watched: false }
    ],


    // list of files to exclude
    exclude: [
      'node_modules/@angular/**/*_spec.js',
      'node_modules/ionic-angular/**/*spec*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    //preprocessors: {
    //  '**/*.ts': ['browserify']
    //},

    //browserify configuration
    //browserify: {
    //  debug: true, // sourcemaps on
    //  transform: [
    //    ['browserify-istanbul', {
    //      instrumenter: require('isparta'),
    //      ignore: ['**/*Spec.ts', '**/*.d.ts'],
    //    }]
    //  ],
    //  plugin: [
    //    ['tsify']
    //  ]
    //},

    // GOTCHA -- Karma proxies _everything_ through base first..
    //           Also any files you want to serve need to be in the files array above with served: true
    proxies: {
      //'/build': '/base/www/build',
      // https://forum.ionicframework.com/t/unit-test-configuration/44973
      // allows us to keep test code separate from app code and still have the references work
      '/base/node_modules/ionic-framework/decorators/app.js': '/base/www/build/test/app.stub.js', // stub out Ionic's @App decorator
      '/base/www/build/app': '/base/www/build',
      '/build': '/base/www/build',
      '/base/plugins': '/base/node_modules/ionic-native/dist/plugins',
      '/base/ionic-native.js': '/base/node_modules/ionic-native/dist/index.js',
      '/base/ng1.js': '/base/node_modules/ionic-native/dist/ng1.js',
      '/base/util.js': '/base/node_modules/ionic-native/dist/util.js',
      '/base/node_modules/rxjs/RX.js': '/base/node_modules/rxjs/Rx.js'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    preprocessors: {
      'build/**/!(*spec).js': ['coverage']
    },

    mochaReporter: {},
    coverageReporter: {
      reporters: [
        {type: 'json', subdir: '.', file: 'coverage-js.json'}
      ]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    singleRun: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // https://github.com/lathonez/clicker/issues/82
    // try increasing this value if you see the error "Disconnected (1 times), because no message in 30000 ms."
    browserNoActivityTimeout: 30000

  });
};
