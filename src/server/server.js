const express = require('express');
const path = require('path');

const app = express();
var dotenv = require('dotenv').config(); // Use environment variables

// *** Start Webpack configuration ***
/**/ const webpack = require('webpack');
/**/ const config = require('../../webpack.config.js');
/**/ const compiler = webpack(config);
/**/ const webpackDevMiddleware = 
/**/ require('webpack-dev-middleware')(
/**/ compiler,
/**/ config.devServer
/**/ );
/**/ 
/**/ const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
/**/ 
/**/ app.use(webpackDevMiddleware);
/**/ app.use(webpackHotMiddleware);
// *** END Webpack configuration ***

// Serve Static Files
const staticMiddleware = express.static(path.resolve(__dirname, "../../dist"));
//app.use(staticMiddleware);


// **Probably not what we want to do long term
// This allows access of static files to be served from the src folder.
app.use(express.static('src'))

// Set the default file type for non-static files
app.set('view engine', 'pug');

// Indicate that the view layer files are in the views directory
app.set('views', path.join(__dirname, '../views'));

const Sequelize = require('sequelize');
var models  = require('../models');

// var router  = express.Router();

// Create sequelize connection to the database
// import db from '../models/index.js'

// Import all database models
var models = require('../models');

var sequelizeConnection = models.sequelize;

const sequelize = new Sequelize(process.env.SCHEMA_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Setup up routes here

//Create a dummy object to pass to the pages. This will become a database call eventually.
const dummyTournaments = { 
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
}

// Do this if someone hits the domain
app.get('/', (req, res) => {

	// The first argument is the file to load. In this case, index.pug
	// Second argument is the data payload to be rendered
	res.render('index', {data: dummyTournaments});
})

app.get('/userdashboard', (req, res) => {
	
	models.Tournament.findAll({})
	.then(function(data) {
	  var payload = {dynamicData: data}
	//   console.log(payload.dynamicData);
	  res.render('userdashboard', {dynamicData: payload.dynamicData});
		
	}).catch(function (err) {
		console.log(err);
	});
})

app.get('/logos', (req, res) => {
	res.render('logo_test');
});

app.get('/testbrackets', (req, res) => {
	res.render('test_brackets');
});

// Start Server
app.listen(8888, () => {
	console.log('Listening on 8888');
});
