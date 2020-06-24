const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const filePath = path.join(__dirname, './public/js/');
const fileName = 'main.min.js';

const PATHS = {
  src: path.join(__dirname, './client'),
  dist: path.join(__dirname, './public'),
};

module.exports = {
  mode: 'development',

  entry: {
    app: path.join(__dirname, 'client/containers/App.jsx'),
  },

  output: {
    publicPath: '/static/js/',
    path: filePath,
    filename: fileName,
  },

  watch: false,
  watchOptions: {
    ignored: '/node_modules/',
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        sourceMap: false,
      }),
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [['@babel/plugin-proposal-object-rest-spread']],
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'public/js/main.min.js'),
          path.resolve(__dirname, 'public/js/bundle.js'),
        ],
        use: {
          loader: 'eslint-loader',
          options: './client/.eslintrc.js',
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
