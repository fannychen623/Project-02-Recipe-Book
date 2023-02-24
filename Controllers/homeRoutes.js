const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// render homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
        },
      ],
    });
  
    const posts = postData.map((post) => post.get({ plain: true }));

    // sort posts
    posts.sort((a, b) => b.id - a.id);

    // limit chars for preview
    for (let i = 0; i < posts.length; i++) { 
      if (posts[i].body.length > 2000){
        posts[i].body = posts[i].body.substring(0, 2000) + '( ...click title to view more)'
      }
    }

    // display paragraphs text
    for (let i = 0; i < posts.length; i++) { 
      let postParasArray = posts[i].body.split("\n")
      for (let j = 0; j < postParasArray.length; j++) {
        if (postParasArray[j] == ""){
          postParasArray.splice(j, 1)
        }
      posts[i].body = postParasArray
      }
    }
    
    // render page
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// render dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Post,
          include: [User, Comment]
        },
      ],
    });

    const user = userData.get({ plain: true });

    // sort posts
    user.posts.sort((a, b) => b.id - a.id);

    // limit chars for preview
    for (let i = 0; i < user.posts.length; i++) { 
      if (user.posts[i].body.length > 2000){
        user.posts[i].body = user.posts[i].body.substring(0, 2000) + '( ...click title to view more)'
      }
    }

     // display paragraphs text
    for (let i = 0; i < user.posts.length; i++) { 
      let postParasArray = user.posts[i].body.split("\n")
      for (let j = 0; j < postParasArray.length; j++) {
        if (postParasArray[j] == ""){
          postParasArray.splice(j, 1)
        }
      user.posts[i].body = postParasArray
      }
    }

    // render page
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// render create form
router.get('/create-post', withAuth, async (req, res) => {
  res.render('post-create', {logged_in: req.session.logged_in});
});

// render update form
router.get('/update-post/:id', withAuth, async (req, res) => {

  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username'],
      },
    ],
  });

  const post = postData.get({ plain: true });

  res.render('post-update', {
    ...post,
    username: req.session.username,
    logged_in: req.session.logged_in
  });

});

// render post
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User]
        },
      ],
    });

    const post = postData.get({ plain: true });

    // display paragraphs text
    let postParasArray = post.body.split("\n")
    for (let j = 0; j < postParasArray.length; j++) {
      if (postParasArray[j] == ""){
        postParasArray.splice(j, 1)
      }
      post.body = postParasArray
    }

    // check for comments authorship
    const comments = post.comments
    for (let k = 0; k < comments.length; k++) {
      if(comments[k].user.username == req.session.username){
        comments[k].deletable = "true";
      }
    }

    // check for post authorship
    const isAuthor = (post.user.username == req.session.username)

    // render page
    res.render('post-display', {
      ...post,
      comments,
      isAuthor,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create comment
router.post('/comment-create', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete comment
router.delete('/delete-comment/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// manage login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('user-login');
});

// manage signup
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('user-signup');
});

module.exports = router;
