var path = require('path');

const config = {};

config.devtool = 'eval-source-map';

config.devServer = {
  historyApiFallback: true,
  port: 9000
};

config.entry = [
  path.resolve(__dirname, 'app/index.js')
];

config.output = {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js'
  // publicPath: 'dist'
}

config.module = {
  rules: [
    {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
  ]
}

module.exports = config;
