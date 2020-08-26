const router = require('express').Router();
const { Post, User, Vote } = require('../../models'); // these create the express endpoints
const sequelize = require('../../config/connection');



// get all posts
router.get('/', (req, res) => {
    console.log('===============');
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
        include: [ // this makes a JOIN 
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData)) // return the promise
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// get a single post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id // sets the value of the id with req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => { // return the promise
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' }); // 404 is user error
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a post route
router.post('/', (req, res) => {
    // expects json info back
    Post.create({

        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id

    })
        .then(dbPostData => res.json(dbPostData)) // return the promise

        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// PUT /api/posts/upvote
router.put('/upvote', (req, res) => {
    // custom static method created in models/Post.js
    Post.upvote(req.body, { Vote })
        .then(updatedPostData => res.json(updatedPostData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});


//create put route
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title // finding the post with req.body.title and replace the title of the post
        },
        {
            where: {
                id: req.params.id // matching the id
            }
        }
    )
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create delete/destroy route
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

module.exports = router; // this exposes the changes/code to the express server. Keep this at the bottom of the file