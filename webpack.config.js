const path = require('path');

const cwd = process.cwd();

const config = {
  entry: path.join(cwd, 'index.js'),
  output: {
    filename: 'index.js',
    path: path.join(cwd, '/dist'),
    library: 'use-polling',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ]
  }
}

module.exports = config;