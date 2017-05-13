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




// POST route for saving a new post
// router.get("/api/events", function(req, res) {
//   var query = {};
//   if (req.query.user_id) {
//     query.creatorId = req.query.user_id;
//   }
//   if (req.query.location) {
//     query.location = req.query.location;
//   }
//   if (req.query.category) {
//     query.category = req.query.category;
//   }
//   if (req.query.date) {
//     query.date = req.query.date;
//   }
//   if (req.query.endTime) {
//     query.endTime = req.query.endTime;
//   } 
//   if (req.query.startTime) {
//     query.startTime = req.query.startTime;
//   }
//   console.log(query);
//   //console.log(req.body.location);
//   db.Event.findAll({
//     //please be nice sequelize test
//     where: query,
//     raw: true
//   }).then(function(dbPost) {
//     res.json(dbPost);
//   }, function(err){
//     res.json([]); 
//   });
// });



// DELETE route for deleting posts
// router.delete("/api/events/:id", function(req, res) {
//   db.Event.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(dbPost) {
//     res.json(dbPost);
//   });
// });

// PUT route for updating posts
// router.put("/api/events", function(req, res) {
//   db.Event.update(
//     req.body,
//     {
//       where: {
//         id: req.body.id
//       }
//     }).then(function(dbPost) {
//       res.json(dbPost);
//     });
// });


//GET route for getting all of the posts
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
    where: query,
    raw: true, 
      attributes: Object.keys(db.Event.attributes).concat([
          [
            db.sequelize.literal('(SELECT COUNT(UserId) FROM partylists WHERE EventId = id)'),
            "numGoing"
          ]
])}).then(function(dbPost) {
    res.json(dbPost);
  });
});

module.exports = router;