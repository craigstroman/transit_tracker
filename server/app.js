import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import { addPath } from 'app-module-path';

import api from './routes/api/index';
import main from './routes/main/index';

const app = express();

const nodeEnv = process.env.NODE_ENV;

const reactApp = nodeEnv === 'development' ? '/static/js/bundle.js' : '/static/js/main.min.js';

if (nodeEnv === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config.dev.js');
  const webpackCompiler = webpack(webpackConfig);

  app.use(
    require('webpack-dev-middleware')(webpackCompiler, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );

  app.use(
    require('webpack-hot-middleware')(webpackCompiler, {
      log: false,
      path: '/__webpack_hmr',
    }),
  );
}

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.locals.title = 'Transit Tracker';
app.locals.content = 'Find your tansit option.';
app.locals.reactApp = reactApp;
app.locals.env = process.env;

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));
addPath(__dirname);

app.use('/api', api);

app.use('/', main);

export default app;
