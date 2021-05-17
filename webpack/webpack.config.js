const path = require('path');
const { merge } = require('webpack-merge');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const openBrowser = require('react-dev-utils/openBrowser');

const SRC_DIR = path.resolve(__dirname, '../src');
const ENV_PATH = path.resolve(__dirname, '../env/.env.local');

const base = require('./webpack.base.config');

const PORT = 8082;

module.exports = merge(base, {
	mode: 'development',
	devtool: 'eval-source-map',
	entry: {
		bundle: ['react-hot-loader/patch', `${SRC_DIR}/index.dev.tsx`],
	},
	output: {
		filename: '[name].js'
	},
	devServer: {
		after: () => {
			openBrowser && openBrowser(`http://localhost:${PORT}`)
		},
		contentBase: './dist',
		port: PORT,
		hot: true,
	},
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom'
		}
	},
	plugins: [
		new Dotenv({ path: ENV_PATH }),
		new ESLintWebpackPlugin({
			extensions: ['ts', 'tsx', 'js', 'jsx'],
			fix: false,
			emitError: true,
			emitWarning: true,
			failOnError: true
		}),
	]
});
