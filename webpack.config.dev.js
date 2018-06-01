const path = require('path');
const webpack = require('webpack');

module.exports = env => {
  const nodeEnv = process.env.NODE_ENV;
  const filePath = path.join(__dirname, './public/js/')
  const fileName = 'bundle.js';

  const plugins = [
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
    })
  ];

  return {
    entry: {
       app: path.join(__dirname, 'client/containers/App.jsx')
    },

    output: {
      path: filePath,
      filename: fileName,
    },

    resolve: {
      extensions: [
        '.js','.jsx'
      ]
    },

    module: {
      loaders: [
         {
           enforce: 'pre',
           test: /\.(js|jsx)$/,
           exclude: [/node_modules/, path.resolve(__dirname, 'public/js/bundle.js')],
           loader: 'eslint-loader',
          options: {
            emitError: true,
            emitWarning: true,
            failOnError: false
          }
         },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        },
        {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },

    plugins: plugins,
  }
};
