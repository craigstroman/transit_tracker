const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

const filePath = path.join(__dirname, './public/js/');
const fileName = 'bundle.js';

const ESLintOptions = {
  overrideConfigFile: path.resolve(__dirname, '.eslintrc.js'),
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
      path.join(__dirname, 'client/containers/App.jsx'),
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
    ],
  },

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
    extensions: ['.js', '.jsx', 'ts', 'tsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
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
          {
            loader: 'sass-resources-loader',
            options: {
              resources: require(path.join(process.cwd(), 'client/scss/utils.js')),
            },
          },
        ],
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
        loader: 'file-loader?name=node_modules/@fortawesome/fontawesome-free/webfonts[name].[ext]',
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
  ],
};
