const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/main/server.ts',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  externals: [nodeExternals()],
  plugins: [
    new CleanPlugin.CleanWebpackPlugin()
  ]
}
