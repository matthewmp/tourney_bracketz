// Import bcryptjs so we can encrypt user passwords before storing to the database
let bCrypt = require('bcryptjs');

// Import passport Strategy (boilerplate Passport element with the passport-local package)
let LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, User) => {
    // Serialize the user for the session. This will plant an ID on the session for reference
    // Boilerplate Passport Code
    passport.serializeUser( (user, done) => {
        done(null, user.id);
    });

    // Deserialize the user session. This will effectively log the user out
    // Boilerplate Passport Code
    passport.deserializeUser((id, done) =>{
        User.findById(id).then((user) =>{
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
    
    // Create a LocalStrategy to handle registrations. 
    // This function is called from the register post route in routes.js
    passport.use('local-signup', new LocalStrategy({
            // Point Passports default fields to the **ids from the registration form**
            usernameField: 'regemail',
            passwordField: 'regpassword',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        (req, email, password, done) => {
            // Use bcrypt to encrypt the password
            let generateHash = (password) => {
                 return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
             };
            
            // Look up user by email
            User.findOne({ where: { email: email }
            }).then((user) => { // Email found
                if (user) {
                    console.log('email found in database. Registration denied.');
                    return done(null, false, req.flash('signupMessage', 'That email is already taken'))
                } else {
                    console.log('email not found in database. Proceed');
                    // Create object to send to the server
                    let userPassword = generateHash(password);
                    let currentDate = new Date();
                    let data = {
                            email: email,
                            password: userPassword,
                            firstname: req.body.regfirstname,
                            lastname: req.body.reglastname,
                            createdAt: currentDate,
                            updatedAt: currentDate
                        };
                    User.create(data).then((newUser, created) => {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy( {
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({ where: { email: email } })
            .then(function(user) {
                if (!user) {
                    console.log('Email is not registered here.')
                    return done(null, false, req.flash('signupMessage', 'Email is incorrect.'))
                }
                if (!isValidPassword(user.password, password)) {
                    console.log('Incorrect password provided.')
                    return done(null, false, req.flash('signupMessage', 'Incorrect password.'))
                }
                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, req.flash('signupMessage', 'Something went wrong with your Signin'))
            });
        }
    ));
}