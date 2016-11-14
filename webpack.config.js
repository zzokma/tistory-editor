var path = require('path');
var webpack = require("webpack");

module.exports = {
	entry: [
		path.join(__dirname, 'src', 'renderer', 'index')
	],
	output: {
		path: path.join(__dirname, 'build'),
		publicPath: '/assets/',
		filename: 'editor.min.js'
	},
	plugins: process.env.NODE_ENV !== "production" ? [] : [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin({
		  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		})
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel-loader'],
			exclude: /node_modules/,
			include: __dirname
		}, {
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}]
	}

}
