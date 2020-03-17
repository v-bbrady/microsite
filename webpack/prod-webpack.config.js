/**
 * Required Imports
 */
const webpack = require('webpack');
const path = require('path');
const paths = require('../gulp/paths');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const BUILD_DIR = path.resolve(`${paths.www}`);
const APP_DIR = path.resolve(`${paths.clients.app}`);

module.exports = {
    entry: APP_DIR + '/app.jsx',
    output: {
        path: BUILD_DIR,
        publicPath: '/',
        filename: 'app.js',
        libraryTarget: 'umd'
    },
    devServer: {
        port: 4002,
        compress: false,
        historyApiFallback: true,
        host: '0.0.0.0'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                exclude: [/\.(test|spec)/, /node_modules/],
                use: [
                    { loader: 'babel-loader' },
                    { loader: 'awesome-typescript-loader' },
                    { loader: 'tslint-loader' }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/i,
                exclude: /images/,
                loader: `file-loader?name=fonts/[name].[ext]`
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /fonts/,
                loader: `file-loader?name=images/[name].[ext]`
            },
            {
                test: /\.(mp4|webm|ogg)$/i,
                exclude: /images/,
                loader: `file-loader?name=videos/[name].[ext]`
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'postcss-loader' },
                        { loader: 'sass-loader' }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: [{ loader: 'file-loader?name=css/[name].[ext]' }]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: false
                        }
                    }
                ]
            },
            {
                test: /\.ejs$/,
                use: [{ loader: 'html-loader' }]
            }
        ]
    },
    plugins: [
        new ModernizrWebpackPlugin({
            options: ['setClasses'],
            'feature-detects': ['css/backdropfilter']
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                REACT_APP_SERVICE_URL: JSON.stringify('azuredatamicrositeservice')
            }
        }),
        new BundleAnalyzerPlugin({
            // Remove this to inspect bundle sizes.
            analyzerMode: 'disabled'
        }),
        new CopyWebpackPlugin([
            {
                from: 'client/app/service-worker-registration.js',
                to: BUILD_DIR,
                force: true
            },
            {
                from: 'client/app/web-animations.min.js',
                to: BUILD_DIR,
                force: true
            },
            {
                // Google domain verification
                from: 'client/app/google3efbbc1048b64b8c.html',
                to: BUILD_DIR,
                force: true
            }
        ]),
        new FaviconsWebpackPlugin({
            logo: './lib/images/microsoft-favicon.png',
            prefix: 'icons/',
            // This filename is used in examples/app.tsx. If this changes,
            // that reference to this file will need to change
            statsFilename: 'iconstats.json',
            persistentCache: false,
            emitStats: true,
            icons: {
                // apple startup icons currently emit an invalid <link> element per https://validator.w3.org/, so omitting this for now.
                appleStartup: false
            }
        }),
        new WebpackShellPlugin({
            // Watch for changes to component files and recompile JSDocs on change
            onBuildEnd: ['npm run sass --deployment']
        }),
        new HtmlWebpackPlugin({
            title: 'Microsoft Azure Data',
            template: path.resolve(APP_DIR, 'index.html')
        }),
        new SWPrecacheWebpackPlugin({
            cacheId: 'microsoft-azuredata',
            filename: 'service-worker.js',
            minify: true,
            staticFileGlobsIgnorePatterns: [/\.map$/]
        }),
        new CleanWebpackPlugin()
    ]
};
