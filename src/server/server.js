import express from 'express';
import path from 'path';

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

//const staticMiddleware = express.static(path.resolve(__dirname, "../../dist"));

//app.use(staticMiddleware);

app.get('/', (req, res) => {
  res.send('hi');
});

app.listen(8888, () => {
	console.log('Listing on 8888');
});
