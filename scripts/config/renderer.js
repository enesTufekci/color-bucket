const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./base');

const paths = require('../paths');
const appConfig = require(paths.APP_CONFIG);

module.exports = merge.smart(baseConfig, {
  mode: 'production',
  target: 'electron-renderer',
  name: 'renderer',
  entry: {
    app: './src/renderer/index.tsx'
  },
  output: {
    path: paths.DIST,
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [paths.RENDERER_DIR],
        exclude: [paths.MAIN_DIR],
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  resolve: {
    alias: {
      '@renderer': path.resolve(`${paths.RENDERER_DIR}/App`),
      '@db': path.resolve(`${paths.SRC}/db`)
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: appConfig.productName || 'Electron App'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
});
