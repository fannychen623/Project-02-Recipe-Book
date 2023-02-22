var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var email = req.body.emailInput;
  res.render('index', {title: 'The Secret Ingredient', email:''});
});

module.exports = router;
