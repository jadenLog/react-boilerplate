const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const base = require('./webpack.base.config');
const SRC_DIR = path.resolve(__dirname, '../src');
const ENV_PATH = path.resolve(__dirname, '../env/.env.prod');

module.exports = merge(base, {
  mode: 'production',
  devtool: 'hidden-source-map',
  entry: {
    bundle: `${SRC_DIR}/index.tsx`,
  },
  output: {
    filename: '[name].[fullhash].js',
    publicPath: '/',
  },
  plugins: [
    new Dotenv({ path: ENV_PATH }),
    new CleanWebpackPlugin(),
  ]
});
