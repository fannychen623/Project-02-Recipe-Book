const router = require('express').Router();
const { User, Recipe, Favorite } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('homepage', { 
    logged_in: req.session.logged_in 
  });
});

router.get('/catalog', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [User, Favorite]
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    
    for (let i = 0; i < recipes.length; i++) {
      recipes[i].favorites_count = recipes[i].favorites.length;
    }

    // Pass serialized data and session flag into template
    res.render('catalog', { 
      recipes, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [User, Favorite]
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    
    for (let i = 0; i < recipes.length; i++) {
      recipes[i].favorites_count = recipes[i].favorites.length;
    }

    // Pass serialized data and session flag into template
    res.render('search', { 
      recipes, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/my-kitchen', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { 
          model: Recipe,
          include: Favorite
        }
      ],
    });

    const user = userData.get({ plain: true });

    // favorites counts
    for (let i = 0; i < user.recipes.length; i++) {
      user.recipes[i].favorites_count = user.recipes[i].favorites.length;
    }

    res.render('my-kitchen', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/my-favorites', withAuth, async (req, res) => {
  try {
    const favsData = await Favorite.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        { 
          model: Recipe,
          include: [User, Favorite]
        }
      ],
    });
    
    const favs = favsData.map((fav) => fav.get({ plain: true }));

    // find user
    const user = await User.findOne({ where: { id: req.session.user_id } })
    const userName = user.username;
    
    // const userName = req.session.username;

    res.render('my-favorites', {
      favs,
      userName,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// manage login
router.get('/login', (req, res) => {
  res.render('login-signup');
});

module.exports = router;