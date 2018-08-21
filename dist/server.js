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
var staticMiddleware = express.static(path.resolve(__dirname, "../../dist"));
app.use(staticMiddleware);

//Template engine for non-static files
app.set('view engine', 'pug');

// Indicate to pug that the view layer files are in the views directory
app.set('views', path.join(__dirname, '../views'));

// Setup up routes here
app.get('/', function (req, res) {
	console.log('index requested');

	res.render('index', {
		title: "Tournament 123",
		winner: "Tom"
	});
});

app.get('/userdashboard', function (req, res) {
	console.log('userdashboard requested');
	res.render('userdashboard', {
		title: "Tournament 123",
		winner: "Tom"
	});
});

// Start Server
app.listen(8888, function () {
	console.log('Listening on 8888');
});