var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
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
