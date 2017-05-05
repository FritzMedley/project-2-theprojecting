var express = require("express");

var router = express.Router();

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/activities", function(req, res){
	res.render("partials/activities");
});

router.get("/account", function(req, res){
	res.render("partials/login");
});

module.exports = router;