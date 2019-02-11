const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const SRC_DIR = __dirname + '/src';
const DIST_DIR = __dirname + '/build';

module.exports = {
  entry: [
    './src/index.jsx',
  ],
  output: {
    path: path.join(__dirname, './build'),
    filename: 'main.js',
    publicPath: 'build/'
  },
  module: {
    rules: [
      {
        test: /src.*\.html$/,
        exclude: [/node_modules/, /src\.html$/],
        use: {
          loader: 'html-loader',
          options: {minimize: true}
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'My Awesome application',
      template: 'src/index.html',
      filename: './index.html',
      inject: true,
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin() 
  ],
  devServer: {
    contentBase: DIST_DIR,
    hot: true,
    port: 9000,
    overlay: true
  }
};