const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');

const DIST_DIR = path.resolve(__dirname, '../dist');

const baseConfig = require('./webpack.config.base');
const EnvironmentKeys = require('./EnvironmentKeys');

module.exports = (env) => {
    const envKeys = EnvironmentKeys.get(env);

    return merge(baseConfig, {
        mode: 'development',
        devtool: 'source-map',
        output: {
            path: DIST_DIR,
            filename: '[name].js',
            publicPath: '/dist/',
        },
        devServer: {
            contentBase: './dist',
            port: 3000,
            hot: true,
            open: true,
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new ManifestPlugin({
                fileName: 'manifest.json',
                basePath: './dist/',
            }),
            new webpack.DefinePlugin({
                ...envKeys,
            }),
        ],
    });
};