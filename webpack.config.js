var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
  entry: {
    'refund-apply': './js/refundApply.js'
  },
  output: {
    path: './build/',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['babel']
    }, {
      test: /\.(jpg|png|gif|webp)$/,
      loader: "url?limit=10000"
    }]
  },
  externals: {

  },
  plugins: [commonsPlugin]
};