const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const favoriteRoutes = require('./favoriteRoutes');
const openaiRoutes = require('./openaiRoutes');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/openai', openaiRoutes);

module.exports = router;
