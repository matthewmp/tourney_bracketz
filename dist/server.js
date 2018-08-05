'use strict';

var express = require('express');
var path = require('path');

var app = express();

var webpack = require('webpack');
var config = require('../../webpack.config.js');
var compiler = webpack(config);
var webpackDevMiddleware = require('webpack-dev-middleware')(compiler, config.devServer);

var webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware);

var staticMiddleware = express.static(path.resolve(__dirname, "../../dist"));

app.use(staticMiddleware);

app.listen(8888, function () {
  console.log('Listing on 8888');
});