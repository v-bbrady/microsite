const gulp = require('gulp');
const path = require('path');
const paths = require('../paths');
const argv = require('yargs').argv;
const chalk = require('chalk');
const scss = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const styleCompiler = require('@ms-fw/fw-stylesheets');
const execFile = require('child_process').execFile;

module.exports = (done) => {
    if (!argv.react) {
        console.warn(chalk.red('gulp packageCss failed.\nEnsure you\'re passing an environment: --react'));
        throw new Error();
    }

    let dest;

    if (argv.react) dest = path.join(paths.packages.react.assets);

    const config = {
        brands: ['blue'],
        regions: 'all',
        themes: 'all',
        dest: './stylesheets',
        filename: (config) => {
            return `fw-microsoft-design-${config.brand}-${config.region}-${config.theme}.css`;
        }
    };

    styleCompiler.compile(config);
}