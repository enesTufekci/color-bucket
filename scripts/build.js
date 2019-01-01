const webpack = require('webpack');

const rendererConfig = require('./config/rendererProd');
const mainConfig = require('./config/mainProd');

webpack([rendererConfig, mainConfig], (err, stats) => {
  process.stdout.write(stats.toString() + '\n');
});
