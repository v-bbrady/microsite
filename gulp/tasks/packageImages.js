const gulp = require('gulp');
const path = require('path');
const paths = require('../paths');
const argv = require('yargs').argv;
const chalk = require('chalk');

module.exports = () => {
    if (!argv.react) {
        console.warn(chalk.red('gulp packageImages failed.\nEnsure you\'re passing an environment: --react'));
        throw new Error();
    }

    let dest;

    if (argv.react) dest = path.join(paths.packages.react.assets, 'images');

    return gulp.src('./lib/assets/images/**/*.{png|jpg|jpeg|svg}')
        .pipe(gulp.dest(dest))
}