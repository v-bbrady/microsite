const gulp = require('gulp');
const tasks = require('./gulp/tasks');

// Node env tasks
gulp.task('setDevelopmentNodeEnv', tasks.setDevelopmentNodeEnv);
gulp.task('setProductionNodeEnv', tasks.setProductionNodeEnv);

/**
 * NPM Tasks
 */
gulp.task('packageComponents', tasks.packageComponents);
gulp.task('packageCss', tasks.packageStyles);
gulp.task('packageImages', tasks.packageImages);
gulp.task('packageSchemas', tasks.packageSchemas);
gulp.task('buildNpmPackage', tasks.buildNpmPackage);