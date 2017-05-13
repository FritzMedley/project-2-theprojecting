var db = require("../models");

module.exports = function() {
  db.User.create({
    name: "Bob Johnson",
    email: "thething1845@yahoo.com",
    credType: "local",
    //password is "123"
    hash: "$2a$11$uahkOtSrWKPKX.Kq4NXGYerER01pw4olCUZTX5YVqwaBzQ2/P33Km"
  }).done(function(){});

  db.User.create({
    name: "No Way",
    email: "thething1845@gmail.com",
    credType: "local",
    //password is "123"
    hash: "$2a$11$slcSFhv3IvO6pQlZXtnJnejqmyqGGnaR3u7FT5LqV1sNysR.vGYAG"
  }).done(function(){});

  db.Event.create({
    description: "Come have a great time playing soccer with some locals here at Zilker. ",
    name: "Soccer Game at Zilker Park",
    image: "http://miltonvt.org/images/department/rec/Pick-Up_Soccer.jpg",
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
    description: "Jake is throwing a pool party for anyone who could make it down here to Manor. Snacks and beverages available. ",
    name: "Jake's Pool Party",
    numAttendees: "2",
    image: "https://sep.yimg.com/ca/I/nationaldiscountpoolsupplies_2267_76248385.jpg",
    category: "Parties",
    location: "Manor, Tx",
    startTime: "2:00", 
    endTime: "6:00",
    creatorId: 1
  }).done(function(dbEvent){
    dbEvent.addUser(1);
  });

    db.Event.create({
    description: "Group Netflix and Chill session. Yup, we're doing it.",
    name: "Movie Night",
    numAttendees: "65",
    image: "https://techranker.net/wp-content/uploads/2015/07/Netflix-App-for-Windows-10.jpg",
    location: "Austin, Tx",
    category: "Sports", 
    startTime: "10:30",
    endTime: "2:00", 
    creatorId: 1
  }).done(function(dbEvent){
    dbEvent.addUser(1);
    dbEvent.addUser(2);
  });

    db.Event.create({
    description: "We're hosting a brunch for Mardi Gras! Yay!",
    name: "Mardi Gras Brunch",
    image: "http://www.travelalltogether.com/wp-content/uploads/2015/01/Mardi-Gras.jpg",
    numAttendees: "25",
    location: "New Orleans, LA",
    category: "Travel", 
    startTime: "10:30",
    endTime: "2:30", 
    creatorId: 1
  }).done(function(dbEvent){
    dbEvent.addUser(1);
    dbEvent.addUser(2);
  });

    db.Event.create({
    description: "Fargo North Dakota's world famous Go-Karting event. You don't want to miss this sensational opportunity to ride with some best Go-Karters in the Midwest.",
    name: "Far-Go-Karting",
    numAttendees: "150",
    location: "Fargo, ND",
    category: "Games", 
    image: "http://3.bp.blogspot.com/-fR2kuYPUaZE/T7BHYgoz_jI/AAAAAAAAFg8/1qO1JlejCys/s1600/35747-Super_Mario_Kart_USA-10.jpg",
    startTime: "3:30",
    endTime: "7:30", 
    creatorId: 1
  }).done(function(dbEvent){
    dbEvent.addUser(2);
  });

  db.Event.create({
    description: "Austin Coding Party!",
    name: "Hang out and learn some JavaScript with some of the friendliest techies in town!",
    numAttendees: "55",
    location: "Austin, Tx",
    category: "Party", 
    image: "http://i.amz.mshcdn.com/JN9sklRVT9yxDUo_R2Caj4o3ogc=/950x534/2012%2F12%2F04%2Fe0%2Fcodecademys.be8_2k7s5.jpg",
    startTime: "9:30",
    endTime: "11:30", 
    creatorId: 2
  }).done(function(dbEvent){
    dbEvent.addUser(2);
  });
};
 