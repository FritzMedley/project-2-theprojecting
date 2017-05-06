var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
  res.render("partials/index2");
});


module.exports = router;
