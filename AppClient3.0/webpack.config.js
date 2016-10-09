/* debug */
const path = require('path');
module.exports = {
  entry: './h5/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?presets[]=es2015&presets[]=react',
      exclude: /node_modules/,
      include: __dirname
    }]
  }
}


