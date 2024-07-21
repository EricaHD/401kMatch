const path_dev = require('path');
const { merge: merge_dev } = require('webpack-merge');
const common_dev = require('./webpack.common.ts');

module.exports = merge_dev(common_dev, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    static: path_dev.resolve(__dirname, './dist'),
    compress: true,
    hot: true,
    port: 8080,
  },
});
