var express = require("express");
var router = express.Router();
var passport = require("passport");
var db = require("../models");
var bcrypt = require("bcrypt");


//Route to the main page
router.get("/", function(req, res){
  var resObject = {
    loggedIn: req.isAuthenticated(),
    loadText: "<h1>Vidi Veni</h1>" + "\n <p>This will be filler text for the home page.</p>",

    //This name is coming from the database.
    // user: req.user
  };

  if (req.user) {
      resObject.user = req.user;
      resObject.name = req.user.name;
      resObject.email = req.user.email;
  }
console.log(res.user);
  res.render("partials/index2", resObject);

});



//Route to activities page
router.get("/activities", function(req, res){
  //if(req.isAuthenticated())
  var resObject = {
    loggedIn: req.isAuthenticated()
  }

  if (req.user) {
      resObject.user = req.user;
      resObject.name = req.user.name;
      resObject.email = req.user.email;
  }

  res.render("partials/activities", resObject);
});

//Route to login page
router.get("/login", function(req, res){
  if(req.isAuthenticated())
    res.redirect("/myaccount");
  else {
    res.render("./skeleton/login");
  }
});

//submit local log in credientials
router.post('/login',
  passport.authenticate('local', { successRedirect: '/myaccount',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

//display create user page
router.get("/createaccount", function(req, res){
  //checks to see if they are authenticated, and if so, bring them to their account page
  if(req.isAuthenticated()) {
    res.redirect("/myaccount")
  }
  //send them to the create account page
  else {
    res.render("./skeleton/createuser");
  }

});

// JOSH'S VERSION OF createaccount
router.post("/createaccount", function(req, res){
  //checks to see if the user actually has an account and direct them to their page
  if(req.isAuthenticated()) {
    res.redirect("/myaccount");
  }
  //else creates an account for the user using the data that he/she passes in.
  else {
    var resObject = {
      name: req.body.username,
      email: req.body.email,
      credType: "local"
  };
  console.log('got here 1')
    db.User.findAll({where: {email: resObject.email}}).done(function(dbUsers){
      console.log('got here 2')
      if(dbUsers.length > 0){
        console.log('got here 3')
        var errHandler = {
          err: "The email is already taken. Please try another email.",
          name: req.body.username
        }
      console.log('got here 4')
      return res.render("./skeleton/createuser", errHandler);
    } else {
      //user created if email isn't taken
      console.log('got here 5')
        const saltRounds = 11;

        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          // Store hash in your password DB.
          resObject.hash=hash;
          db.User.create(resObject).done(function(dbUser){
            return res.redirect("/login");
          });
        });
        console.log('got here 6')
      }
      console.log('GOTHERE 7')
      // getting here means the account was created, so can I now set those values for the object?
    });
    console.log('GOTHERE 8')
  }
});
// END JOSH VERSION

router.get("/myaccount", function(req, res) {
  //Custom object that loads indivial user account page
  if(req.isAuthenticated()) {

    var userInfo = {
      name: req.user.name,
      email: req.user.email
    };
    res.render("./skeleton/partial1", userInfo);
  }
});


router.get("/createdevents", function(req, res){
  if(req.isAuthenticated()) {
    db.Event.findAll({where:
      {creatorid: req.body.id}
    }).done(function(dbEvents){
      res.render("/userevents", dbEvents);
    });
  }
  else {
    res.redirect("/login");
  }
});

router.get("/joinedevents", function(req, res){
  //if(req.isAuthenticated()) {
    db.Event.findAll({where:
      {Userid: req.body.id}
    ,
    include: [db.User]
    }).done(function(dbEvents){
      res.render("/userevents", dbEvents);
    });
  //}
  // else {
  //   res.redirect("/login");
  // }
});

// "display" logout page, this logous you out, destorys the session, and redirects to the homepage
router.get('/logout', function(req, res) {
  req.logOut();
    req.session.destroy(function(){
    res.redirect('/');
  });
});




router.post("/create", function(req, res) {
//We need a conditional that only stores the data if all properties are available.
var event = {};
event.name = req.body.name;
event.numAttendees = req.body.attendees;
event.creatorID = req.body.creator;
event.image = req.body.image;
event.description = req.body.description;

db.Event.create(event).then(function(dbEvent){
    //redirect to individual page for created event.
    res.redirect("/event?id=" + dbEvent.id);
}, function(err){
  if (err) throw err;
  res.redirect("/error?msg=error");
});
});


module.exports = router;
