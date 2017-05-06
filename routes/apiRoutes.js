// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var express = require("express");
var router = express.Router();


// Routes
// =============================================================


// GET route for getting all of the posts
router.get("/api/events", function(req, res) {
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
  db.Event.findAll({
    where: query
  }).then(function(dbPost) {
    res.json(dbPost);
  });
});

router.post("/find", function(req, res) {
  var query = {};
  if (req.body.user_id) {
    query.creatorId = req.body.user_id;
  }
  if (req.body.location) {
    query.location = req.body.location;
  }
  if (req.body.category) {
    query.category = req.body.category;
  }
  if (req.body.date) {
    query.date = req.body.date;
  }
  if (req.body.time) {
    query.time = req.body.time;
  }
  db.Event.findAll({
    where: query
  }).then(function(dbPost) {
    res.render("/activities", dbPost);
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


})

//

// POST route for saving a new post
router.post("/api/events", function(req, res) {
  db.Event.create(req.body).then(function(dbPost) {
    res.json(dbPost);
  });
});

// DELETE route for deleting posts
router.delete("/api/events/:id", function(req, res) {
  db.Event.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbPost) {
    res.json(dbPost);
  });
});

// PUT route for updating posts
router.put("/api/events", function(req, res) {
  db.Event.update(
    req.body,
    {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
});


module.exports = router;
