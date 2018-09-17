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
//app.use(staticMiddleware);


// **Probably not what we want to do long term
// This allows access of static files to be served from the src folder.
app.use(express.static('src'));

// Set the default file type for non-static files
app.set('view engine', 'pug');

// Indicate that the view layer files are in the views directory
app.set('views', path.join(__dirname, '../views'));

// Setup up routes here

//Create a dummy object to pass to the pages. This will become a database call eventually.
var tournaments = {
	tournamentOneName: {
		NumPlayers: "8",
		winner: "Tom"
	},
	tournamentTwoName: {
		NumPlayers: "64",
		winner: "Matt"
	},
	tournamentThreeName: {
		NumPlayers: "16",
		winner: "Brandon"
	},
	tournamentFourName: {
		NumPlayers: "32",
		winner: "Dean"
	}

	// Do this if someone hits the domain
};app.get('/', function (req, res) {

	// The first argument is the file to load. In this case, index.pug
	res.render('index', { data: tournaments });
});

app.get('/userdashboard', function (req, res) {
	res.render('userdashboard', { data: tournaments });
});

app.get('/logos', function (req, res) {
	res.render('logo_test');
});

// Start Server
app.listen(8888, function () {
	console.log('Listening on 8888');
});