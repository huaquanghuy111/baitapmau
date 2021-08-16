const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'main.js',
  },
  devtool: 'inline-source-map',

  target: 'node',

  watch: true,
  plugins: [
    new NodemonPlugin(), // Dong
  ],
  externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore'],
}
