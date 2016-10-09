/* production */
const path = require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var DefinePlugin = require("webpack/lib/DefinePlugin");

module.exports = {
  entry: {
    bundle: './h5/app.js',
    vendor: [
    'react',
    'redux',
    "react-router",
    'react-redux',
    'react-router-redux',
    'react-dom',
    'crypto',
    "uuid",
    'querystring',
    ]
  },
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  plugins: [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new CommonsChunkPlugin('vendor',  'vendor.js'),
    new UglifyJsPlugin({minimize:true})
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?presets[]=es2015&presets[]=react',
      exclude: /node_modules/,
      include: __dirname
    }]
  }
}
