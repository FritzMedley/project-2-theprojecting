var db = require("../models");

module.exports = function() {
  db.User.create({
    name: "Bob Johnson",
    email: "bob@bob.com",
    credType: "local",
    //password is "123"
    hash: "$2a$11$uahkOtSrWKPKX.Kq4NXGYerER01pw4olCUZTX5YVqwaBzQ2/P33Km"
  }).done(function(){});

  db.User.create({
    name: "No Way",
    email: "no@no.com",
    credType: "local",
    //password is "123"
    hash: "$2a$11$slcSFhv3IvO6pQlZXtnJnejqmyqGGnaR3u7FT5LqV1sNysR.vGYAG"
  }).done(function(){});

  db.Event.create({
    description: "This is where the description goes",
    name: "Soccer Game at the Field",
    numAttendees: "100",
    location: "Austin, Tx",
    category: "Sports", 
    startTime: "9:30",
    endTime: "10:30", 
    creatorId: 1
  }).done(function(dbEvent){
    dbEvent.addUser(1);
    dbEvent.addUser(2);
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

    db.Event.create({
    description: "This is where the description goes",
    name: "Soccer Game at the Field",
    numAttendees: "100",
    location: "Austin, Tx",
    category: "Sports", 
    startTime: "9:30",
    endTime: "10:30", 
    creatorId: 1
  }).done(function(dbEvent){
    dbEvent.addUser(1);
    dbEvent.addUser(2);
  });

    db.Event.create({
    description: "This is where the description goes",
    name: "Soccer Game at the Field",
    numAttendees: "100",
    location: "Austin, Tx",
    category: "Sports", 
    startTime: "9:30",
    endTime: "10:30", 
    creatorId: 1
  }).done(function(dbEvent){
    dbEvent.addUser(1);
    dbEvent.addUser(2);
  });

    db.Event.create({
    description: "This is where the description goes",
    name: "Soccer Game at the Field",
    numAttendees: "100",
    location: "Austin, Tx",
    category: "Sports", 
    startTime: "9:30",
    endTime: "10:30", 
    creatorId: 1
  }).done(function(dbEvent){
    dbEvent.addUser(2);
  });

  db.Event.create({
    description: "Billie Jean is not my live!",
    name: "Michael Jackson party!",
    numAttendees: "100",
    location: "Houston, Tx",
    category: "Party", 
    startTime: "9:30",
    endTime: "11:30", 
    creatorId: 2
  }).done(function(dbEvent){
    dbEvent.addUser(2);
  });
};
 