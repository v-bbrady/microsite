const path = require('path');

// Define area paths
const lib = path.resolve('./lib');
const client = path.resolve('./client');
const packages = path.resolve('./packages');

exports.lib = lib;
exports.components = path.resolve(lib, 'components');
exports.modules = path.resolve(lib, 'modules');
exports.utilities = path.resolve(lib, 'utilities');
exports.client = client;
exports.www = path.resolve('./www');

exports.clients = {
    app: path.resolve(client, 'app')
};

exports.ms_fw_microsoft_design = {
    fonts: `${lib}/assets/fonts/'**/*.{eot,svg,ttf,woff,woff2}`,
    images: `${lib}/assets/images/**/*.png`,
    videos: `${lib}/assets/videos/**/*.{mp4,webm,ogg}`,
    stylesheets: `${lib}/assets/styles/**/*.scss`
};
