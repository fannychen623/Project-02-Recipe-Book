const router = require('express').Router();
const { Recipe, User, Favorite } = require('../../models');
const withAuth = require('../../utils/auth');

// create recipe
router.post('/', withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});


// display recipe
router.get('/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [User, Favorite]
    });

    const recipe = recipeData.get({ plain: true });

    const favsData = await Favorite.findAll({ 
      where: { 
        user_id: req.session.user_id,
        recipe_id: recipe.id,
      },
    });

    const favs = favsData.map((fav) => fav.get({ plain: true }));
    
    let favorited = favs.length > 0 ? true : false

    // const isAuthor = (recipe.user.id == req.session.user_id)

    res.render('recipe', {
      ...recipe,
      favorited,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
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