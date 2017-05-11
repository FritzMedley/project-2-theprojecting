var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var methodOverride = require("method-override");
var db = require("./models");
var passport = require("passport");
var session = require("express-session");

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE also PUT
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//maybe need?
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }));
var sess = {
  secret: 'keyboard cat',
  saveUninitialized: false,
  resave: false,
  cookie: {}
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(require("flash")());

//execute code in passport.js
require("./config/passport.js")();

// Import routes and give the server access to them.
var htmlRoutes = require("./routes/htmlRoutes.js");
var loginRoutes = require("./routes/loginRoutes.js");
var apiRoutes = require("./routes/apiRoutes.js");
var grantTestRoutes = require("./routes/grantTestRoutes.js");
var eventRoutes = require("./routes/eventRoutes.js");

app.use("/", htmlRoutes);
app.use(loginRoutes);
app.use(apiRoutes);
app.use(grantTestRoutes);
app.use(eventRoutes);


//set equal to false to run tests on local machine
db.sequelize.sync({force:true}).then(function(){
  app.listen(PORT, function(){
    console.log("Server listening on PORT: "+ PORT);
  });
  var dummyEvents = require("./config/dummySeeds.js");
  dummyEvents();
});



