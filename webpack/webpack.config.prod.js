const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');
const EnvironmentKeys = require('./EnvironmentKeys');

module.exports = (env) => {
    const envKeys = EnvironmentKeys.get(env);

    return merge(baseConfig, {
        mode: 'production',
        devtool: 'hidden-source-map',
        plugins: [
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