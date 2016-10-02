// noinspection JSUnusedLocalSymbols,ThisExpressionReferencesGlobalObjectJS
/**
 * System configuration for Angular 2 apps
 * Adjust as necessary for your application needs.
 */
(function (global) { // eslint-disable-line no-unused-vars

  // map tells the System loader where to look for things
  var map = {
    'app': 'build', // 'dist',
    '@angular': 'node_modules/@angular',
    'rxjs': 'node_modules/rxjs',
    'lodash': 'node_modules/lodash/lodash.js'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': {main: 'main.js', defaultExtension: 'js'},
    'rxjs': {defaultExtension: 'js'}
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
  ];

  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/' + pkgName] = {main: 'index.js', defaultExtension: 'js'};
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/' + pkgName] = {main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js'};
  }

  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);

  var config = {
    map: map,
    packages: packages
    // baseURL: 'x'
  };

  // noinspection ES6ModulesDependencies,NodeModulesDependencies
  System.config(config);

})(this);
