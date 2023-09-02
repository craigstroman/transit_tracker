const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

const filePath = path.join(__dirname, './public/js/');
const fileName = 'bundle.js';

const ESLintOptions = {
  overrideConfigFile: path.resolve(__dirname, 'client/.eslintrc.js'),
  context: path.resolve(__dirname, '/client'),
  extensions: ['js', 'jsx', 'ts', 'tsx'],
  exclude: ['/node_modules/'],
  emitError: true,
  emitWarning: true,
};

module.exports = {
  mode: 'development',

  devtool: 'source-map',

  entry: {
    app: [
      path.join(__dirname, 'client/containers/App.tsx'),
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
    ],
  },

  // TODO: Fix hot update not working with Webpack on the client side when I run npm run live:server
  // TODO: Remove live:client script because I don't think I need it anymore and rename live:server script to match GitHub Note Taker

  output: {
    publicPath: '/static/js/',
    path: filePath,
    filename: fileName,
    hotUpdateChunkFilename: '.hot/hot-update.js',
    hotUpdateMainFilename: '.hot/hot-update.json',
  },

  watch: false,
  watchOptions: {
    ignored: '/node_modules/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: './client/.eslintrc.js',
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin(ESLintOptions),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      sourceMap: true,
      devTool: 'source-map',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new webpack.DefinePlugin({
      process: { env: {} },
    }),
  ],
};
