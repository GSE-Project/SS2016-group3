const TASK = 'coverage-enforcer-soft';
const core = require('../../gulp-core');
const enforcer = require('./enforcer-function');

core.gulp.task(TASK, () => {
  return core.gulp
    .src([core.config.coverageReports['json-summary']])
    .pipe(core.intercept((file) => {
      let result = enforcer(file);
      core.subHeading(TASK, result.message);
    }));
});
