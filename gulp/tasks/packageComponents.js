const babel = require('gulp-babel');
const gulp = require('gulp');
const path = require('path');
const paths = require('../paths');
const argv = require('yargs').argv;
const chalk = require('chalk');
const typescript = require('gulp-typescript');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const tsProject = typescript.createProject('tsconfig.json', { declaration: true });

let commonPaths = [
    path.normalize(`${paths.utilities}/**/*.ts`),
    path.normalize(`${paths.components}/*/*.common.ts`),
    path.normalize(`${paths.modules}/*/*.common.ts`),

    // Ignore all tests
    path.normalize(`!${paths.lib}/**/*.{test,spec}.{ts,tsx,js,jsx}`),
    path.normalize(`!**/*/{__tests__,__mocks__}/*`)
];

let reactPaths = [
    path.normalize(`${paths.lib}/**/*react.exports.ts`),
    path.normalize(`${paths.components}/*/react/index.{ts,tsx}`),
    path.normalize(`${paths.modules}/*/react/index.{ts,tsx}`),
    path.normalize(`${paths.components}/*/react/[A-Z]*.{ts,tsx}`),
    path.normalize(`${paths.modules}/*/react/[A-Z]*.{ts,tsx}`),
]

module.exports = () => {
    if (!argv.react) {
        console.warn(chalk.red('gulp packageComponents failed.\nEnsure you\'re passing an environment: --react'));
        throw new Error();
    }

    let dest;
    let files;

    if (argv.react) {
        dest = paths.packages.react.root;
        files = commonPaths.concat(reactPaths);
    }

    return gulp.src(files, { base: paths.lib })
    .pipe(tsProject())
    .pipe(rename((path) => {
        // Rename export files to 'index' to align with industry standards
        if (argv.react) {
            path.basename = path.basename.replace('react.exports', 'index');
        }
    }))
    // Replace references to export files with empty strings so imports resolve to index files
    .pipe(replace('/react.exports', ''))
    .pipe(gulp.dest(dest))
}