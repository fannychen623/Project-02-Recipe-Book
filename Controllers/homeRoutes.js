const router = require('express').Router();
const { User, Recipe, Favorite, Random } = require('../models');
const withAuth = require('../utils/auth');
const { Configuration, OpenAIApi } = require("openai");


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
      console.log(recipes[i].favorites_count)
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

router.get('/my-kitchen', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

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
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    res.render('my-favorites', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// random recipe call to OpenAI API
router.post('/random', withAuth, async (req, res) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write a recipe based on these ingredients and/or instructions:${Random.text}`,
      temperature: 0.9,
      max_tokens: 120,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    });
    res.render('random-response')
  } catch (err) {
    console.log(err)
  }
});



// manage login
router.get('/login', (req, res) => {
  res.render('login-signup');
});

module.exports = router;
