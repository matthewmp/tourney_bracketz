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

// Configure body-parser for form data retrival
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Sequelize configuration
const Sequelize = require('sequelize');
var models  = require('../models');

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

// Import bcryptjs
var bcrypt = require('bcryptjs');

//Create a dummy object to pass to the pages. This will be replaced with a database call
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

// Setup up routes here

// Do this if someone hits the root of the website
app.get('/', (req, res) => {

	// The first argument is the file to load. In this case, index.pug
	// Second argument is the data payload to be rendered
	res.render('index', {data: dummyTournaments});
})

app.get('/userdashboard', (req, res) => {
	
	// Query the database for all Tournaments
	models.Tournament.findAll({})
	.then(function(data) {
		// Package the returned JSON file
		var payload = {tournamentdata: data}
		
		// Instruct Node to parse the payload file within the userdashboard.pug template before sending the result to the client
	  res.render('userdashboard', {tournamentdata: payload.tournamentdata});
		
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


// Prototype API to return the tournament data.
app.get('/JSON/:tournamentID', (req, res) => {
	models.Tournament.findAll({
		include: [{
			model: models.Players,
			where: { 'tournamentID': req.params.tournamentID }
		}]
	})
	.then(function(data) {
		// Package the returned JSON file
		var payload = {tournamentdata: data}
		
		// Send JSON to the user
		res.json({payload});
		
	}).catch(function (err) {
		console.log(err);
	});	
});

// Post route to listen for user registration
app.post('/register', (req, res) => {
	var currentDate = new Date();
	
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(req.body.regpassword, salt);

  //Use Sequelize to push to DB
  models.User.create({
		// username: req.body.regusername,
		firstname: req.body.regfirstname,
		lastname: req.body.reglastname,
		email: req.body.regemail,
		password: hash,
    createdAt: currentDate,
    updatedAt: currentDate
  }).then(function(){
		res.redirect('/');
  })
  .catch(function(err) {
    // print the error details
    console.log(err);
  });
});

// Start Server
app.listen(8888, () => {
	console.log('Listening on 8888');
});
