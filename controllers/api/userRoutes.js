const router = require('express').Router();
const { User } = require('../../models');

// create new account
router.post('/signup', async (req, res) => {
  try {
    // pass in request body to create
    const userData = await User.create(req.body);

    // save new user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// user log in
router.post('/login', async (req, res) => {
  try {
    // check that the unique email exist
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again.' });
      return;
    }

    // check the password with hash in model
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again.' });
      return;
    }

    // save user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// user logout
router.get('/logout', (req, res) => {
  // destroy the session
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }

  // redirect to the hompage after log out
  res.redirect('homepage');
});

module.exports = router;