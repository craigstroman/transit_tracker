const path = require('path');
const webpack = require('webpack');

module.exports = env => {
  const nodeEnv = process.env.NODE_ENV;
  const filePath = path.join(__dirname, './public/js/')
  const fileName = env.type === 'maps' ? 'maps.js' : 'bundle.js';

  const plugins = [
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
    })
  ];

  return {
    entry: {
       app: env.type === 'maps' ? path.join(__dirname, 'client/map/index.js') : path.join(__dirname, 'client/containers/App.jsx')
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
           exclude: [
            /node_modules/,
            path.resolve(__dirname, 'public/js/bundle.js'),
            path.resolve(__dirname, 'public/js/main.min.js'),
            path.resolve(__dirname, 'public/js/maps.js'),
            path.resolve(__dirname, 'public/js/maps.min.js'),
           ],
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
            use: [
              {
                loader: "style-loader"
              },
              {
                loader: "css-loader"
              },
              {
                loader: "sass-loader"
              },
              {
                loader: "sass-resources-loader",
                options: {
                  resources: require(path.join(process.cwd(), 'client/scss/utils.js'))
                }
              }
            ]
        }
      ]
    },

    plugins: plugins,
  }
};
