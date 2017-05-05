var express = require("express");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var GOOGLE_CLIENT_KEY = require("../config/auth.js").GOOGLE_CONSUMER_KEY;
var GOOGLE_CLIENT_SECRET = require("../config/auth.js").GOOGLE_CONSUMER_SECRET;



// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_KEY,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("=============================");
    console.log(accessToken);
    console.log("=============================");
    console.log(refreshToken);
    console.log("=============================");
    console.log(profile);
    console.log("=============================");
    console.log();
    console.log("=============================");
      //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //    return done(err, user);
      //  });
      return done(null, profile);
  }
));

passport.serializeUser(function(user, callback){
        console.log('serializing user.');
        callback(null, user);
    });

passport.deserializeUser(function(user, callback){
       console.log('deserialize user.');
       callback(null, user);
    });

var router = express.Router();

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/auth/google',
  passport.authenticate('google', { scope : ['profile', 'email'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', { successRedirect:"/success", failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });


router.get('/logout', function(req, res) {
  req.logOut();
  req.session.destroy(function(){
    res.redirect('/');
  });
  
});

router.get("/success", function(req, res){
  req.isAuthenticated
  res.send("Logged in");
});

router.get("/test", function(req, res){
  if(req.isAuthenticated())
    res.send("Person is allowed");
  else
    res.send("No, not allowed");
});

module.exports = router;