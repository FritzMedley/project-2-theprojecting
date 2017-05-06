var express = require("express");
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

var router = express.Router();

router.get("/login", function(req, res){
  if(req.isAuthenticated())
    res.send("You are already logged in!");
  else {
    res.render("login");
  }
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/success',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

router.get("/createUser", function(req, res){
  res.render("createUser");
});

router.post("/createUser", function(req, res){
  var newUser = {
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    credType: "local"
  };
  db.User.findAll({where: {email: newUser.email}}).done(function(dbUsers){
    if(dbUsers.length > 0){
      return res.send("Sorry, that email is taken already");
    } else {
      db.User.create(newUser).done(function(dbUser){
        return res.send("Account made");
      });
    }
  });
});

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
  req.isAuthenticated();
  res.send("Logged in");
});

router.get("/test", function(req, res){
  if(req.isAuthenticated())
    res.send("Person is allowed");
  else
    res.send("No, not allowed");
});

router.get("/users", function(req, res){
  db.User.findAll({}).done(function(dbUsers){
    res.json(dbUsers);
  })
});

module.exports = router;