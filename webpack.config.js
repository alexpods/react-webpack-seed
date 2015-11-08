const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;

const vendors = Object.getOwnPropertyNames(packageJson.dependencies);

module.exports = {
  context: __dirname,
  debug: true,
  target: 'web',
  devtool: 'inline-source-map',

  devServer: {
    inline: true,
    colors: true,
    contentBase: 'public'
  },

  entry: {
    vendors: vendors,
    app: './src/index.js'
  },

  output: {
    path: 'public',
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.jsx', '.js']
  },

  plugins: [
    new CommonsChunkPlugin('commons.js'),
    new HotModuleReplacementPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: /src/,
        loaders: ['react-hot', 'babel']
      }
    ]
  }
};
