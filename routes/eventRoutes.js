var express = require("express");
var router = express.Router();
var passport = require("passport");
var db = require("../models");

//Route to activities page
router.get("/activities", function(req, res){
  //if(req.isAuthenticated())
  // var resObject = {
  //   loggedIn: req.isAuthenticated()
  // }
  db.Event.findAll({limit: 250}).then(function(dbEvents){
  	var hbsObject = {event: dbEvents};
  	res.render("./partials/activities", hbsObject);
  });
});

router.get("/createevent", function(req, res) {
  if(req.isAuthenticated()) {
	  res.render("./partials/createevent");
    // Grant's code JIC we need it for handlebars
    // res.render("./skeleton/createEvent", {name:req.user.name, email:req.user.email}
  }
  else {
    res.redirect("/login");
  }
});

router.post("/findevents", function(req, res){
  var query = {};
  if (req.query.user_id) {
    query.creatorId = req.query.user_id;
  }
  if (req.query.location) {
    query.location = req.query.location;
  }
  if (req.query.category) {
    query.category = req.query.category;
  }
  if (req.query.date) {
    query.date = req.query.date;
  }
  if (req.query.time) {
    query.time = req.query.time;
  }

})

router.get("/findevents", function(req, res) {
      res.render("partials/findevent");  
});

// router.post("///findevent", function(req, res) {
//   var query = {};
//   if (req.body.user_id) {
//     query.creatorId = req.body.user_id;
//   }
//   if (req.body.location) {
//     query.location = req.body.location;
//   }
//   if (req.body.category) {
//     query.category = req.body.category;
//   }
//   if (req.body.date) {
//     query.date = req.body.date;
//   }
//   if (req.body.time) {
//     query.time = req.body.time;
//   }
//   console.log(req.body);
//   //console.log(req.body.location);
//   db.Event.findAll({
//     where: {
//        location: req.body.location     
//     }
//   }).then(function(dbPost) {
//    // console.log(dbPost);
//     var hbsObject = {event: dbPost};
//     res.json(hbsObject);
//   });
// });

router.post("/createevent", function(req, res){
  if(!req.isAuthenticated())
    res.redirect("/login");
  else {
    console.log(req.body);
    var newEvent = {
      description: req.body.description,
      name: req.body.name,
      numAttendees: parseInt(req.body.numAttendees),
      category: req.body.category,
      location: req.body.location,
      startTime: req.body.startTime, 
      endTime: req.body.endTime,
      date: req.body.month + " " + req.body.day + " , " + req.body.year,
      creatorId: req.user.id,
      image: req.body.image
    };
    if(!req.body.image) {
    	newEvent.image = "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg"
    }
    //store the event in the dabtabase
    db.Event.create(newEvent).then(function(dbEvent){
    	console.log(dbEvent);
    	console.log(dbEvent.id);
     dbEvent.addUser(req.user.id);
     //  after the event created, redirect the
     //  user to an individual event page labeled by ID in database 
    res.json({redirect: "/event/?id="+dbEvent.id});   
    });
  }
});


router.get("/event", function(req, res){
  //checks to see if the user joined the event
  if(req.query.join === "true") {
      if (req.isAuthenticated()) {
        db.Event.findOne({
          where: {
            id: req.query.id
          }
        }).done(function(dbEvent){
          //this checks if the user has already joined event 
            dbEvent.hasUser(req.user.id).done(function(result){
              if(!result) {
                //adds the user to the event
                dbEvent.addUser(req.user.id);
              }
            }); 
        });
      }
      else {
        return res.redirect("/login");
      }
  }
  if(req.query.id !== null) {
  	console.log(req.query.id);
     db.Event.findOne({
        where: {
           id: req.query.id
        }
    }).done(function(dbEvent){
     if(dbEvent === null) {
     	//console.log("DB-Event is equalling null");
      res.redirect("/activities")
     } else {
     	var hbsObject = {event: dbEvent}
     	console.log(hbsObject);
      res.render("./partials/singleevent", hbsObject)
     }
    }, function(err){
        if (err) throw err;
        res.redirect("/activities");
    });
  }
  else {
  	//console.log("This is the one that's happening.")
    res.redirect("/activities");
  }
});

// router.get("/findactivities", function(req, res){
// 	//need to pass in query
// 	db.Event.findAll({
// 		where {
// 			firstName: req.query.firstName;
// 		}

// 	})
// })

module.exports = router;
