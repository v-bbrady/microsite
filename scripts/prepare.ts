const { exec } = require('child_process');
const { argv } = require('yargs');

/**
 * Run all style and doc generation
 */
if (argv.deployment) {
    exec('npm run sass:deployment', (error, stdout, stderror) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
    });
} else {
    exec('npm run sass', (error, stdout, stderror) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
    });
}