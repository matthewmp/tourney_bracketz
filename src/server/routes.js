module.exports = function(app, passport,models) {

    var generatePublicURL = require('./generatePublicURL');

    // **********************
    // Authentication Controls
    // **********************

    // Handle registration requests through Passport
    app.post('/register', 
        passport.authenticate('local-signup', {
            successRedirect: ('/userdashboard'),
            failureRedirect: ('/')
        }
    ));
    
    app.post('/login',passport.authenticate('local-signin', { 
        successRedirect: '/userdashboard',
        failureRedirect: '/',
        failureFlash: true })
    );

    // Route if login is rejected
    app.get('/loginfailed', (req,res) => {
        res.json({ message: "Login failed."});
    });
    
    // Logout user
    app.get('/logout', (req,res) => {
        req.session.destroy((err) => {
            res.redirect('/');
        })
    });

    // Passport Middleware function to check if current user is logged in
    // Used to protect routes from anonymous access
    function isLoggedIn(req, res, next) {
         if ( req.isAuthenticated() ) {
            return next();
         }
         res.redirect('/');
    }

    // This simply checks if the user is in a session. 
    // This is used to modify objects to turn on/off elements that are only for users that are logged in
    function confirmUserSession(req) {
        if ( req.user != undefined ) {
            return true;
        } else {
            return false;
        }
    }

    // **************************
    // End Authorization Controls
    // **************************

    // Do this if someone hits the root of the website. They will not be logged in.
    app.get('/', (req, res) => {        
        // If user is logged in, use the user info to generate the object
        if ( confirmUserSession(req) == true ) {
            // Find the User
            models.User.findOne({
                where: {
                    id: req.user.id
                }
            }).then(function(data) {
                // Package the returned JSON file
                var payload = {tournamentdata: data};

                // Parse the payload data within userdashboard.pug before sending the result to the client
                res.render('index', {tournamentdata: payload.tournamentdata});
            }).catch(function (err) {
                console.log(err);
            });
        } else {
            // If the user is not logged in, pass a dummy object
            // console.log("Flash message is " + req.flash('signupMessage'))
            res.render('index', { message: req.flash('signupMessage') });
        }
    })

    // Access the specific user dashboard. Only accessible when logged in.
    app.get('/userdashboard', isLoggedIn, (req, res) => {

        // Find the User
        models.User.findOne({
            where: {
                id: req.user.id
            },
            // Include all tournaments for this user
            include: [{
                model: models.Tournament
            }]
        })
        .then(function(data) {
            // Package the returned JSON file
            var payload = {tournamentdata: data};

            // Parse the payload data within userdashboard.pug before sending the result to the client
            res.render('userdashboard', {tournamentdata: payload.tournamentdata});
        }).catch(function (err) {
            console.log(err);
        });
    })

    // Route for the logos page. Remove before launch
    app.get('/logos', (req, res) => {
         
        if ( confirmUserSession(req) == true ) {
            // Find the User
            models.User.findOne({
                where: {
                    id: req.user.id
                }
            }).then(function(data) {
                res.render('logo_test', {tournamentdata: data});
            }).catch(function (err) {
                console.log(err);
            });
        } else {
            res.render('logo_test');
        }
    });

    // Route for the public URL. This is a accessible to anyone with the correct Tournament ID
    app.get('/public/:uniqueURL', (req, res) => {
        // console.log(req.params.uniqueURL);
        models.Tournament.findAll({
            where: {
                publicURL: req.params.uniqueURL
            },
            include: [{
                model: models.Players,
            }]
        })
        .then(function(data) {
            // Package the returned JSON file
            var payload = {tournamentdata: data}
            
            // Load the page
            res.render('public', {tournamentdata: payload.tournamentdata});
            // res.json({payload});
            
        }).catch(function (err) {
            console.log(err);
        });	
    });

    // API to return the tournament data in JSON format.
    app.get('/JSON/:tournamentID', (req, res) => {
        models.Tournament.findAll({
            where: {
                id: req.params.tournamentID
            },
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

    // Route to save a new tournament
    app.post('/saveTournament', isLoggedIn, (req,res) => {
        
        // Split all names by line breaks
        var tournamentPlayers = req.body.playerNameEntry.split("\r\n");
        var currentDate = new Date();

        var generatedpublicURL = generatePublicURL();
        
        // Create the *Tournament* from the form
        models.Tournament.create({
          userID: req.session.passport.user,
          title: req.body.tName,
          publicURL: generatedpublicURL,
          winner: "winner",
          createdAt: currentDate,
          updatedAt: currentDate
        }).then(data => {
            models.sequelize.transaction(function (t) {
                let promises = []; // Array to store all player info to be processed
                
                // Iterate through all players and create a promise for each one
                for (var i = 0; i < tournamentPlayers.length; i++) {
                    var newPromise = models.Players.create({
                        tournamentID: data.id,
                        playername: tournamentPlayers[i], // Player name from array
                        seed: i + 1, // Seed in order (1st player is the top seed )
                        wins: 0,
                        createdAt: currentDate,
                        updatedAt: currentDate
                    });
                    promises.push(newPromise);
                }
                return Promise.all(promises); // Execute all promises
            }).then(function (result) {
                // On success route to dashboard
                res.redirect('../userdashboard');
            }).catch(function(err) {
            // print the error details on the player creation
            console.log(err);
            });
        }).catch(function(err) {
            // print the error details on the tournament creation
            console.log(err);
        });
    });

    // Route to save a new tournament
    app.get('/deletetournament/:tournamentID', isLoggedIn, (req,res) => {
        
        // This should be done in one command; research & fix to remove the second execution

        // Delete the *Tournament*
        models.Tournament.destroy({
            where: {
                id: req.params.tournamentID
            }
        }).catch(function(err) {
            console.log(err);
        })

        // Delete the *Players* associated with this tournament
        models.Players.destroy({
            where: {
                tournamentID: req.params.tournamentID
            }
        }).catch(function(err) {
            console.log(err);
        })

        res.redirect('../userdashboard');
    });

    // Start Server
    app.listen(8888, () => {
        console.log('Listening on 8888');
    });
}