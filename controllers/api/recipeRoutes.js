const router = require('express').Router();
const { Recipe, User, Favorite } = require('../../models');
const withAuth = require('../../utils/auth');

// create new recipe, require login authentication
router.post('/', withAuth, async (req, res) => {
  try {
    // pass in request body to create
    const newRecipe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update recipe based on recipe id, require login authentication
router.put('/:id', withAuth, async (req, res) => {
  try {
    // update recipe based on request body
    const recipe = await Recipe.update(
      {
        recipe_name: req.body.recipe_name,
        recipe_image: req.body.recipe_image,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json(err);
  }
});


// display specific recipe based on id
router.get('/:id', async (req, res) => {
  try {
    // find recipe based on request id
    const recipeData = await Recipe.findByPk(req.params.id, {
      // JOIN with user and favorite data
      include: [User, Favorite]
    });

    // serialize data so the template can read it
    const recipe = recipeData.get({ plain: true });
    
    // define flags for template
    let favorited;
    let isAuthor;

    // if user is logged in, check if recipe has been favorited by user
    if(req.session.logged_in){
      const favsData = await Favorite.findAll({ 
        where: { 
          user_id: req.session.user_id,
          recipe_id: recipe.id,
        },
      });

      // serialize data so the template can read it
      const favs = favsData.map((fav) => fav.get({ plain: true }));
      
      // if data was returned then set user favorite item as true
      // displays filled star item instead of unfilled star
      favorited = favs.length > 0 ? true : false

      // if recipe user id matches the session id, define user as recipe's author
      // to show modify button
      isAuthor = (recipe.user.id == req.session.user_id)
    }

    // pass serialized data, flags, and session flag into template
    res.render('recipe', {
      ...recipe,
      favorited,
      isAuthor,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// modify recipe based on recipe id, require login authentication
router.get('/modify/:id', withAuth, async (req, res) => {
  try {
    // find recipe based on request id
    const recipeData = await Recipe.findByPk(req.params.id, {
      // JOIN with user and favorite data
      include: [User, Favorite]
    });

    // serialize data so the template can read it
    const recipe = recipeData.get({ plain: true });

    // pass serialized data and session flag into template
    res.render('modify', {
      ...recipe,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// search for recipe on the search page
router.post('/search', async (req, res) => {
  try {
    // find all recipes
    const recipeData = await Recipe.findAll();

    // serialize data so the template can read it
    const allRecipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // filter recipes if recipe name includes request body search input
    const recipes = allRecipes.reduce(function(filtered, recipe) {
      // convert strings to lowercase so search is not case-sensitive
      if (recipe.recipe_name.toLowerCase().indexOf(req.body.searchInput.toLowerCase()) >= 0) {
        // add recipe name and id to filtered array
        filtered.push({recipe_name: recipe.recipe_name, id: recipe.id});
      }
      return filtered;
    }, []);

    // add recipe ids from filtered array to new array
    const recipeIds = [];
    for (let i = 0; i < recipes.length; i++) {
      recipeIds.push(recipes[i].id);
    }

    // send the array of id's back to function to filter out recipes
    res.send({ 
      recipeIds, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a recipe based on id, require login authentication
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // check recipe user id matches the session user id
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
