const path = require('path');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ goal }) => ({
  mode: goal,
  devServer:
    goal === 'development'
      ? { contentBase: path.join(__dirname, 'src') }
      : undefined,
  devtool: goal === 'development' ? 'cheap-module-source-map' : undefined,
  optimization:
    goal === 'development' ? { minimize: false } : { minimize: true },
  entry: path.join(__dirname, 'src', 'index.jsx'),
  output: {
    filename: 'App.bundle.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new ErrorOverlayPlugin(),
  ],
});
