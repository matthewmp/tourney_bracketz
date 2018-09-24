var authController = require('./passportcontroller.js');
var models = require('../models');

// Import bcryptjs
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

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

module.exports = function(app) {
 
    app.get('/signup', authController.signup);
 
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

    //Process registration requests using Passport
    //app.post('/register', passport.authenticate('local-signup', {
    //successRedirect: ('../userdashboard'), //if authenticated, proceed to adminportal page
    //failureRedirect: ('/') //if failed, redirect to login page (consider options here!!)
    //}));

    // Post route to listen for user registration
    // app.post('/register', (req,res) => {
        // var currentDate = new Date();
        
        // var hash = bcrypt.hashSync(req.body.regpassword, salt);
        // }
    // Use Sequelize to push to DB
    // models.User.create({
        // 	firstname: req.body.regfirstname,
        // 	lastname: req.body.reglastname,
        // 	email: req.body.regemail,
        // 	password: hash,
    //   createdAt: currentDate,
    //   updatedAt: currentDate
    // }).then(() => {
        // 	res.redirect('/');
    // })
    // .catch((err) => {
    //   // print the error details
    //   console.log(err);
    // });
    // });


    app.post('/login', (req, res) => {
        
        var hash = bcrypt.hashSync(req.body.password, salt);
        // req.body.password
        // password: hash,

        models.User.findOne({
            where: {
                email: req.body.email
            }
    }).then(() => { // Continue if email is found
            res.redirect('/');
        }).catch((err) => { // Email is not registered

        })

    })


    // Start Server
    app.listen(8888, () => {
        console.log('Listening on 8888');
    });
}