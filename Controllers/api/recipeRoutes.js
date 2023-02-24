var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  
  if (id == 'pizza') {
  res.render('recipes', {
    title: "Crispy Pizza, oh my!",
    img: 'https://www.simplyrecipes.com/thmb/h7H8UgA28OOJNGiP_bqXCYONB7o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-4-82c60893fcad4ade906a8a9f59b8da9d.jpg', 
    desc: "<p>Create a homemade thin crust pepperoni pizza!</p><br>Fast Food pizza places don't add the freshest ingredients but you are now under control.<p>"
});

} else {
  res.end('Invalid Request.');
}
});








///
///
///
///


const router = require('express').Router();

const { User, Post, Comment } = require('../../model');

const sequelize = require('../../config/connection');

const auth = require('../../util/auth');



// GET posts
router.get('/', (req, res) => {
    Post.findAll({
        // config for returning post data
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        order: [[ 'created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Favorite,
                attributes: ['id', 'recipe_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    // AND then!
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// GET a recipe
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'recipe_text',
            'title',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Favorite,
                attributes: ['id', 'recipe_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'This is an unidentified flying recipe!!'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//CREATE new recipe
router.post('/', auth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// UPDATE a recipe
router.put('/:id', auth, (req, res) => {
    Post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'This recipe does not exist yet!'});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// DELETE a recipe
router.delete('/:id', auth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'This recipe already does not exist!!'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;
