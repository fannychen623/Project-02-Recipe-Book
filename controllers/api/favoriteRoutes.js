const router = require('express').Router();
const { Favorite } = require('../../models');
const withAuth = require('../../utils/auth');

// create new favorite item, require login authentication
router.post('/', withAuth, async (req, res) => {

  try {
    // pass in request body to create
    const newFavorite = await Favorite.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newFavorite);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a favorite based on id, require login authentication
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // check for the favorite item's user id matches the session user id
    const favoriteData = await Favorite.destroy({
      where: {
        recipe_id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!favoriteData) {
      res.status(404).json({ message: 'No favorite found with this id!' });
      return;
    }

    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;