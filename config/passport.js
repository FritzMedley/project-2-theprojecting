var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var GOOGLE_CLIENT_KEY = require("../config/auth.js").GOOGLE_CONSUMER_KEY;
var GOOGLE_CLIENT_SECRET = require("../config/auth.js").GOOGLE_CONSUMER_SECRET;

var db = require("../models");

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
module.exports = function() {
  passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_KEY,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        var loggedUser = {
          oauthId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          credType: "google"
        };
        console.log(profile);
        db.User.findOne({where: {oauthId: loggedUser.oauthId, credType: loggedUser.credType}}).done(function(dbUser){
          if(dbUser!==null)
            return done(null, dbUser);
          else {
            db.User.create(loggedUser).done(function(dbUser){
              return done(null, dbUser);
            });
          }
        });
    }
  ));

  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback : true
    }, function(req, username, password, done){
    var loggedUser  = {
      email: username,
      password: password
    };

    db.User.findOne({where: {email: loggedUser.email}}).done(function(dbUser){
      if(dbUser!==null) {
        if(dbUser.password === loggedUser.password)
          return done(null, dbUser);
        else
          return done(null, false, {message: "Incorrect Password"});
      }
      else {
        return done(null, false, {message: "No account found, checm email"});
      }
    });
  }));

  passport.serializeUser(function(user, callback){
    console.log('serializing user.');
    //we really only need to store the user.id so we can look it up via database
    //now, here, we are storing the entire database User object and all fields
    callback(null, user);
  });

  passport.deserializeUser(function(user, callback){
    console.log('deserialize user.');
    //if we only store the user.id in the session, we'll need to retrive the rest of ther USER information fromt he db
    //and return that
    //here, since we are already storing the entire user object, we can just use it directly.

    callback(null, user);
  });
};