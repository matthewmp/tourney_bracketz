var bCrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

module.exports = function(passport, User) {
    // serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialize the user session
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
    
    passport.use('local-signup', new LocalStrategy({
            // Point Passports default fields to my form ids
            usernameField: 'regemail',
            passwordField: 'regpassword',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            console.log(email);
            // Use bcrypt to encrypt the password
            var generateHash = function(password) {
                 return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
             };
            
            // Look up user by email
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) { // Email found
                console.log('email found in database');
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else {
                    console.log('email not found in database');
                    var userPassword = generateHash(password);
                    var currentDate = new Date();
                    var data = {
                            email: email,
                            password: userPassword,
                            firstname: req.body.regfirstname,
                            lastname: req.body.reglastname,
                            createdAt: currentDate,
                            updatedAt: currentDate
                        };
                    User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            }).catch(function(err) {
                console.log(err);
            })
        }
    ));
}