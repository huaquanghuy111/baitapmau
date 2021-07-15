const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin')


module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader"
        }
    },
    ]
  },
  target: 'node',
 
  watch: true,
  plugins: [
    new NodemonPlugin(), // Dong
  ],
};
