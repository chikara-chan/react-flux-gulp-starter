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
    }]
  },
  externals: {
    
  }
};