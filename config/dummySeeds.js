var db = require("../models");

module.exports = function() {
  db.User.create({
    name: "Bob Johnson",
    email: "bob@bob.com",
    credType: "local",
    password: "123"
  }).done(function(){});

  db.Event.create({
    description: "Test",
    name: "Ttest Name",
    numAttendees: "1",
    location: "Austin, Tx",
    creatorId: 1
  }).done(function(dbEvent){
    dbEvent.addUser(1);
  });

  db.Event.create({
    description: "Test the 2",
    name: "Ttest Name the second",
    numAttendees: "2",
    location: "Manor, Tx",
    creatorId: 1
  }).done(function(dbEvent){
    dbEvent.addUser(1);
  });

};