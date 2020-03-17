/**
 * Clean task to remove generated files. The following commands exist:
 *
 * NPM Package commands
 * --npmPackage --react: cleans the react npm package files
 */

const argv = require('yargs').argv;
const del = require('del');
const path = require('path');
const paths = require('../gulp/paths');
const chalk = require('chalk');


let cleanPaths;
const cleanConfig = {
    deployment: paths.packages.deployment,
    npm: {
        react: [
            path.resolve(paths.packages.react.root, '**/*'),
            `!${path.resolve(paths.packages.react.root, 'package.json')}`
        ]
    }
};

/**
 * Handle --npmPackage arguments
 */
if (argv.npmPackage) {
    if (argv.react) {
        cleanPaths = cleanConfig.npm.react;
    } else {
        console.warn(chalk.yellow('You passed --npmPackage without any known package args. Did you mean to use --react?'));
    }
} else if (argv.deployment) {
    cleanPaths = [cleanConfig.deployment];
}


if (!cleanPaths) {
    // Throw a warning if no paths are cleaned
    console.warn(chalk.yellow('No paths cleaned - the config options you passed did not match any files to clean.'));
} else {
    console.log(chalk.underline('Cleaning paths:'));
    console.log(chalk.green(cleanPaths.join('\n')));
    // Perform the clean
    del(cleanPaths);
}

// We need to export something or typescript complains
// https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {};