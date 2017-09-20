/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
/* eslint-enable */

module.exports = webpackMerge(commonConfig(), {
  devtool: 'inline-source-map',
  output: {
    path: path.resolve('./target/www'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new CleanWebpackPlugin(['target/www'],{ root: path.join(__dirname, '..'), verbose: true }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader?cacheDirectory'],
        include: path.resolve('./src/main/webapp/app')
      }
    ]
  },
  devServer: {
    historyApiFallback:{
      index:'./target/www/index.html'
    },
    contentBase: './target/www',
    proxy: [
      {
        context: [
          '/api', '/management', '/swagger-resources', '/v2/api-docs', '/h2-console'
        ],
        target: 'http://127.0.0.1:8080',
        secure: false
      }, {
        context: ['/websocket'],
        target: 'ws://127.0.0.1:8080',
        ws: true
      }
    ]
  }
});
