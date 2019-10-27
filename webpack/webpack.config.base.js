const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, '../dist');
const SRC_DIR = path.resolve(__dirname, '../src');

module.exports = {
    entry: {
        bundle: ['@babel/polyfill', `${SRC_DIR}/index.jsx`],
        vendor: ['react', 'react-dom', 'axios'],
    },
    output: {
        path: DIST_DIR,
        filename: '[name].[hash].js',
        publicPath: '/dist/',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vender: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    enforce: true,
                },
            },
        },
        minimizer: [
            new TerserPlugin({
                extractComments: true,
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: '[name].[ext]?[hash]',
                            publicPath: '/',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${SRC_DIR}/index.html`,
            inject: true,
            filename: `${DIST_DIR}/index.html`,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new WebpackCleanupPlugin(),
    ],
};