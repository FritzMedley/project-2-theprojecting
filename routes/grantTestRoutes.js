var express = require("express");
var passport = require("passport");

var db = require("../models");


var router = express.Router();

//display login in page
router.get("/login", function(req, res){
  if(req.isAuthenticated())
    res.send("You are already logged in!");
  else {
    res.render("./skeleton/login");
  }
});

//submit local log in credientials
router.post('/login',
  passport.authenticate('local', { successRedirect: '/test/success',
                                   failureRedirect: '/test/login',
                                   failureFlash: true })
);

//display create user page
router.get("/createUser", function(req, res){
  res.render("./skeleton/createUser");
});

//submit create user page, only used if not logged in already or via google
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

router.get("/createEvent", function(req, res){
  if(!req.isAuthenticated())
    res.redirect("/test/login");
  else {
    res.render("./skeleton/createEvent", {name:req.user.name, email:req.user.email});
  }
});

router.post("/createEvent", function(req, res){
  if(!req.isAuthenticated())
    res.send("You are not logged in");
  else {
    var newEvent = {
      description: req.body.description,
      name: req.body.name,
      numAttendees: req.body.numAttendees,
      category: req.body.category,
      UserId: req.user.id,
    };

    db.Event.create(newEvent, {

    }).then(function(dbEvent){
      dbEvent.addUser(req.user.id);
      res.send(dbEvent);
    });
  }
});


// "display" logout page, this logous you out, destorys the session, and redirects to the homepage
router.get('/logout', function(req, res) {
  req.logOut();
  req.session.destroy(function(){
    res.redirect('/');
  });
  
});

//display successfuly login via any method
router.get("/success", function(req, res){
  req.isAuthenticated();
  res.send("Logged in");
});

//display test page that detects if someone is logged in or not
router.get("/test", function(req, res){
  if(req.isAuthenticated())
    res.send("Person is allowed");
  else
    res.send("No, not allowed");
});

//api'ish route, returns all users from database
router.get("/users", function(req, res){
  db.User.findAll({}).done(function(dbUsers){
    res.json(dbUsers);
  })
});

//api'ish route, returns all events from database
router.get("/events", function(req, res){
  db.Event.findAll({}).done(function(dbEvents){
    res.json(dbEvents);
  })
});

router.get("/myevents", function(req, res){
  if(!req.isAuthenticated())
    res.redirect("/test/login");
  else {

  }
});

module.exports = router;