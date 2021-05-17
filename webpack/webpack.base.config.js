const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, '../src');
const DIST_DIR = path.resolve(__dirname, '../dist');

module.exports = {
  output: {
    path: DIST_DIR,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { browsers: 'last 2 versions' } }],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              ['@babel/plugin-transform-runtime', { corejs: 3 }],
              'react-hot-loader/babel',
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'react-boilerplate',
      template: `${SRC_DIR}/index.html`,
      inject: true,
      filename: `${DIST_DIR}/index.html`,
    }),
    new ForkTsCheckerWebpackPlugin(),
  ]
}
