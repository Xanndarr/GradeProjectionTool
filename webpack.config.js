const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server', // Hotloading not working currently
  ],
  output: { // Compile into js/build.js
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'index.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    modules: [
      'node_modules',
      'public',
    ],
    extensions: ['', '.js', '.css'],
  },
  devtool: 'eval', // debugging - can be source-map etc
  target: 'web', // Make web variables accessible to webpack, e.g. window
  devServer: {
    contentBase: './public',
    hot: true,
    noInfo: true
  },

};
