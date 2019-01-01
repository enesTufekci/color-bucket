const PORT = 4455;

module.exports = {
  port: PORT,
  compress: true,
  noInfo: true,
  stats: 'errors-only',
  inline: true,
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: {
    verbose: true,
    disableDotRule: false
  }
};
