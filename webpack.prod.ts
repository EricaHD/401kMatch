const { merge: merge_prod } = require('webpack-merge');
const common_prod = require('./webpack.common.ts');

module.exports = merge_prod(common_prod, {
  mode: 'production',
});
