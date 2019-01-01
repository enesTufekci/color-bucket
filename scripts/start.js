'use strict';

process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
  throw err;
});

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const spawn = require('child_process').spawn;

const rendererDevConfig = require('./config/rendererDev');
const devServerConfig = require('./config/devServer');
const mainDevConfig = require('./config/mainDev');
const paths = require('./paths');

const PORT = 4455;
const HOST = '0.0.0.0';

const mainCompiler = webpack(mainDevConfig);

const serverConfig = {
  ...devServerConfig,
  before() {
    mainCompiler.run((err, stats) => {
      if (err) throw err;
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n'
      );

      spawn('electron', [paths.DIST_MAIN], {
        shell: true,
        env: process.env,
        stdio: 'inherit'
      })
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    });
  }
};

const rendererCompiler = webpack(rendererDevConfig);

const devServer = new WebpackDevServer(rendererCompiler, serverConfig);

devServer.listen(PORT, HOST, err => {
  if (err) {
    return console.log(err);
  }
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    devServer.close();
    process.exit();
  });
});
