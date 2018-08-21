'use strict';

var express = require('express');
var path = require('path');

var app = express();

// *** Start Webpack configuration ***
/**/var webpack = require('webpack');
/**/var config = require('../../webpack.config.js');
/**/var compiler = webpack(config);
/**/var webpackDevMiddleware =
/**/require('webpack-dev-middleware')(
/**/compiler,
/**/config.devServer
/**/);
/**/
/**/var webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
/**/
/**/app.use(webpackDevMiddleware);
/**/app.use(webpackHotMiddleware);
// *** END Webpack configuration ***

// Serve Static Files
var staticMiddleware = express.static(path.resolve(__dirname, "../../dist/"));
app.use(staticMiddleware);

// Setup up routes here


// Start Server
app.listen(8888, function () {
	console.log('Listing on 8888');
});