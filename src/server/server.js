const express = require('express');
const path = require('path');

const app = express();

const webpack = require('webpack');
const config = require('../../webpack.config.js');
const compiler = webpack(config);
const webpackDevMiddleware = 
require('webpack-dev-middleware')(
  compiler,
  config.devServer
);

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware);

const staticMiddleware = express.static(path.resolve(__dirname, "../../dist"));

app.use(staticMiddleware);

// Setup up routes here



app.listen(8888, () => {
	console.log('Listing on 8888');
});
