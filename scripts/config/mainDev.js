const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./base');
const paths = require('../paths');

module.exports = merge.smart(baseConfig, {
  mode: 'development',
  target: 'electron-main',
  name: 'main',
  entry: {
    main: paths.MAIN_ENTRY
  },
  output: {
    path: paths.DIST,
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [paths.MAIN_DIR],
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
});
