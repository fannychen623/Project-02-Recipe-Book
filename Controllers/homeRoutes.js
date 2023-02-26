const router = require('express').Router();
const { User, Recipe, Favorite } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/catalog', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const recipeData = await Recipe.findAll({
      attributes: {
        include: [[sequelize.fn('COUNT', sequelize.col('recipe_id')), 'recipes_count']]
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Favorite,
          attributes: [
            [sequelize.fn('COUNT', sequelize.col('recipe_id')), 'favorites_count'],
          ],
          group:["recipe_id"]
        },
      ],
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    const remainder = recipes.recipes_count % 2; 
    if (remainder == 0) {
      const pageCount = Math.floor(recipes.recipes_count/2);
    } else {
      const pageCount = Math.floor(recipes.recipes_count/2) + 1 ;
    }
    
    // Pass serialized data and session flag into template
    res.render('catalog', { 
      recipes, 
      pageCount,
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
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// manage login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/my-kitchen');
    return;
  }
  res.render('login-signup');
});

module.exports = router;
