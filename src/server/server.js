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

// Configure Sequelize
const Sequelize = require('sequelize');
var models = require('../models');
// var sequelizeConnection = models.sequelize;

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

// Configure Passport
var passport = require('passport');
var session = require('express-session');
// require('../config/passport-config.js');
//load passport strategies
require('../config/passport-config.js')(passport, models.User);

app.use(session({ 
  secret: 'tom_session_test',
  resave: true,
  saveUninitialized: true
 })); 
app.use(passport.initialize());
app.use(passport.session());

// Import routes.js (and pass app to it)
var authRoute = require('./routes.js')(app,passport);


