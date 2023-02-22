var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  
  if (id == 'pizza') {
  res.render('recipes', {
    title: "Crispy Pizza, oh my!",
    img: 'https://www.simplyrecipes.com/thmb/h7H8UgA28OOJNGiP_bqXCYONB7o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-4-82c60893fcad4ade906a8a9f59b8da9d.jpg', 
    desc: "<p>Create a homemade thin crust pepperoni pizza!</p><br>Fast Food pizza places don't add the freshest ingredients but you are now under control.<p>"
});

} else {
  res.end('Invalid Request.');
}
});

module.exports = router;
