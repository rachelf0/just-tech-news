const router = require('express').Router();

const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models'); // importing modules and models


router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            // pass a single post object into the homepage template
            console.log(dbPostData[0]);
            const posts = dbPostData.map(post => post.get({ plain: true })); // loops over and maps each sequelize object into a serialized version of itself

            res.render('homepage', { posts });
            // get returns simple information
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }); // using render instead of send or sendfile
}); // .handlebars extension is implied

module.exports = router;