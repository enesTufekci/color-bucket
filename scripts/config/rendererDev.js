const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const rendererBaseConfig = require('./renderer');

const paths = require('../paths');

module.exports = merge.smart(rendererBaseConfig, {
  mode: 'development',
  entry: ['react-hot-loader/patch', paths.RENDERER_ENTRY],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [paths.RENDERER_DIR],
        exclude: [paths.MAIN_DIR],
        loaders: ['react-hot-loader/webpack', 'ts-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@renderer': path.resolve(`${paths.RENDERER_DIR}/App`),
      '@db': path.resolve(`${paths.SRC}/db`)
    }
  },
  plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()],
  devtool: 'eval'
});
