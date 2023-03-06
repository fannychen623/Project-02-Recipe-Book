const router = require('express').Router();
const { User, Recipe, Favorite } = require('../models');
const withAuth = require('../utils/auth');

// GET homepage
router.get('/', (req, res) => {
  res.render('homepage', { 
    logged_in: req.session.logged_in 
  });
});

// GET login-sinup page
router.get('/login', (req, res) => {
  res.render('login-signup');
});

// GET catalog page
router.get('/catalog', async (req, res) => {
  try {
    // get all recipes and JOIN with user and favorite data
    const recipeData = await Recipe.findAll({
      include: [User, Favorite]
    });

    // serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    
    // count the number of favorites per recipe
    for (let i = 0; i < recipes.length; i++) {
      recipes[i].favorites_count = recipes[i].favorites.length;
    }

    // pass serialized data and session flag into template
    res.render('catalog', { 
      recipes, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET search page
router.get('/search', async (req, res) => {
  try {
    // get all recipes and JOIN with user and favorite data
    const recipeData = await Recipe.findAll({
      include: [User, Favorite]
    });

    // serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    
    // count the number of favorites per recipe
    for (let i = 0; i < recipes.length; i++) {
      recipes[i].favorites_count = recipes[i].favorites.length;
    }

    // pass serialized data and session flag into template
    res.render('search', { 
      recipes, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET my-kitchen page, require login authentication
router.get('/my-kitchen', withAuth, async (req, res) => {
  try {
    // find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      // do not include the password
      attributes: { exclude: ['password'] },
      // JOIN with recipe and favorite data
      include: [
        { 
          model: Recipe,
          include: Favorite
        }
      ],
    });

    // serialize data so the template can read it
    const user = userData.get({ plain: true });

    // count the number of facvorites per recipe
    for (let i = 0; i < user.recipes.length; i++) {
      user.recipes[i].favorites_count = user.recipes[i].favorites.length;
    }

    // pass serialized data and session flag into template
    res.render('my-kitchen', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET my-favorites page, require login authentication
router.get('/my-favorites', withAuth, async (req, res) => {
  try {
    // get all favorites where user id matches session id
    const favsData = await Favorite.findAll({
      where: {
        user_id: req.session.user_id,
      },
      // JOIN with recipe data that JOINED with user and favorite data
      include: [
        { 
          model: Recipe,
          include: [User, Favorite]
        }
      ],
    });
    
    // serialize data so the template can read it
    const favs = favsData.map((fav) => fav.get({ plain: true }));

    // find username based on session user id
    const user = await User.findOne({ where: { id: req.session.user_id } })
    const userName = user.username;

    // pass serialized data and session flag into template
    res.render('my-favorites', {
      favs,
      userName,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;