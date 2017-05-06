var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
  // var user = {authed: false};
  // if(req.user) {
  //   user.name = req.user.name;
  //   user.email = req.user.email;
  //   user.authed = req.isAuthenticated();
  // }
  // res.render("index", user);

  res.render("partials/index2");

});

router.get("/activities", function(req, res){
	res.render("partials/activities");
});

router.get("/account", function(req, res){
	res.render("partials/login");
});

router.get("/create", function(req, res) {
	res.render("partials/create");
});

router.get("/find", function(req, res) {
	res.render("partials/find");
});

module.exports = router;
