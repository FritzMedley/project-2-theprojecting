var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var methodOverride = require("method-override");
var db = require("./models");
var passport = require("passport");

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
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Import routes and give the server access to them.
var htmlRoutes = require("./routes/htmlRoutes.js");
var loginRoutes = require("./routes/loginRoutes.js");

app.use("/", htmlRoutes);
app.use(loginRoutes);

db.sequelize.sync({force:true}).then(function(){
  app.listen(PORT, function(){
    console.log("Server listening on PORT: "+PORT);
  });
});
