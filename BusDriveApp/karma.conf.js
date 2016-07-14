// Karma configuration
// Generated on Thu May 12 2016 11:12:41 GMT+0200 (Mitteleuropäische Sommerzeit)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify', 'source-map-support'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/es6-shim/es6-shim.js',        // TypeError: undefined is not a constructor (evaluating 'new exports.Map()')
      'node_modules/reflect-metadata/Reflect.js', // 'Uncaught reflect-metadata shim is required when using class decorators'
      'node_modules/zone.js/dist/zone.js',        // Zone.js dependencies (Zone undefined)
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'test/**/*Spec.ts', 
      //'typings/browser.d.ts',
      {pattern: 'node_modules/reflect-metadata/Reflect.js.map', included: false, served: true}, // 404 on the same
      //({ pattern: 'node_modules/ionic-native/dist/**/*.js', included: false, watched: false },
],


    // list of files to exclude
    exclude: [
      'node_modules/@angular/**/*_spec.js',
      'node_modules/ionic-angular/**/*spec*'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.ts': ['browserify']
    },

    //browserify configuration
    browserify: {
      debug: true, // sourcemaps on
      transform: [
        ['browserify-istanbul', {
          instrumenter: require('isparta'),
          ignore: ['**/*Spec.ts', '**/*.d.ts'],
        }]
      ],
      plugin: [
        ['tsify']
      ]
    },

    // GOTCHA -- Karma proxies _everything_ through base first..
    //           Also any files you want to serve need to be in the files array above with served: true
    proxies: {
      '/build': '/base/www/build',
      // https://forum.ionicframework.com/t/unit-test-configuration/44973
      // allows us to keep test code separate from app code and still have the references work
      /*'/base/node_modules/ionic-framework/decorators/app.js': '/base/www/build/test/app.stub.js', // stub out Ionic's @App decorator
      '/base/www/build/app': '/base/www/build/test',
      '/build': '/base/www/build/test',
      '/base/plugins': '/base/node_modules/ionic-native/dist/plugins',
      '/base/ionic-native.js': '/base/node_modules/ionic-native/dist/index.js',
      '/base/ng1.js': '/base/node_modules/ionic-native/dist/ng1.js',
      '/base/util.js': '/base/node_modules/ionic-native/dist/util.js'*/
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // https://github.com/lathonez/clicker/issues/82
    // try increasing this value if you see the error "Disconnected (1 times), because no message in 30000 ms."
    browserNoActivityTimeout: 30000

  })
}
