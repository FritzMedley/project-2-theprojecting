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


module.exports = router;
