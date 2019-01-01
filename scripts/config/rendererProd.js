const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./renderer');

module.exports = merge.smart(baseConfig, {
  mode: 'production',
  plugins: [new UglifyJsPlugin()]
});
