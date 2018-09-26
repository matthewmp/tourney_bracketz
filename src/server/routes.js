// var models = require('../models');

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

module.exports = function(app, passport,models) {
    
    // **********************
    // Authorization Controls
    // **********************

    // Handle registration requests through Passport
    app.post('/register', 
        passport.authenticate('local-signup', {
            successRedirect: ('/userdashboard'),
            failureRedirect: ('/')
        }
    ));
    
    // Handle login requests through Passport
    app.post('/login', passport.authenticate('local-signin', {
            successRedirect: '/userdashboard',
            failureRedirect: '/'
        }
    ));

    // Logout user
    app.get('/logout', (req,res) => {
        req.session.destroy((err) => {
            res.redirect('/');
        })
    });

    // Middleware function to check if current user is logged in
    function isLoggedIn(req, res, next) {
         if ( req.isAuthenticated() ) {
            return next();
         }
         res.redirect('/');
     }

    // **************************
    // End Authorization Controls
    // **************************
    
    // Do this if someone hits the root of the website
    app.get('/', (req, res) => {

        // The first argument is the file to load. In this case, index.pug
        // Second argument is the data payload to be rendered
        res.render('index', {data: dummyTournaments});
    })

    // Access the specific user dashboard. Only accessible when logged in.
    app.get('/userdashboard', isLoggedIn, (req, res) => {
        console.log(req.user.id)
        // Query the database for all Tournaments for this user
        models.Tournament.findAll({
            where: {
                UserId: req.user.id
            },
            include: [{
                model: models.User,
                attributes: ['firstname', 'lastname', 'createdAt']
            }]
        })
        .then(function(data) {
            // Package the returned JSON file
            var payload = {tournamentdata: data}

            // Parse the payload data within userdashboard.pug before sending the result to the client
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

    // Start Server
    app.listen(8888, () => {
        console.log('Listening on 8888');
    });
}