const { argv } = require('yargs');
const path = require('path');
const glob = require('glob');
const paths = require('../gulp/paths');
const FWSass = require('@ms-fw/fw-stylesheets');
const fs = require('fs');
const { execFile } = require('child_process');

let config;

if (argv.deployment) {
    config = {
        dest: './.tmp',
        brands: ['blue'],
        regions: ['west-european', 'arabic'],
        sources: './lib/assets/styles/_microsoft_design_base.scss',
        minify: true,
        filename: (config) => {
            return `fw-microsoft-design-${config.region}-${config.theme}-${config.brand}-18102.css`
        }
    }
} else {
    config = {
        dest: './.tmp',
        brands: ['blue'],
        regions: ['west-european', 'arabic'],
        sources: './lib/assets/styles/_microsoft_design_base.scss',
        filename: (config) => {
            return `fw-microsoft-design-${config.region}-${config.theme}-${config.brand}-18102.css`
        }
    };
}

FWSass.compile(config)
.then(() => {
    if (!argv.watch) { return; }

    glob('**/*.scss', {'ignore': ['node_modules/**/*']}, (err, files) => {
        if (err) { throw err; }

        files.map((file) => {
            fs.watch(file, (event, fileName) => {
                // Exit if this is not a change event
                if (event !== 'change') return;

                FWSass.compile(config);
            });
        });
    });
})
.catch((err) => {
    throw err;
});

// We need to export something or typescript complains
// https://stackoverflow.com/questions/40900791/cannot-redeclare-block-scoped-variable-in-unrelated-files
export {};