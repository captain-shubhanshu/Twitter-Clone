const route = require('express').Router()
const Post = require('../models/posts')

route.get('/', (req, res) => {
    if (!req.user)
        return res.redirect('/login')
    Post.find({ postedBy: { $ne: req.user._id } }, (err, posts) => {
        return res.render('explore', {
            title: 'Nagarro WebApp',
            subtitle: 'Explore',
            name: req.user.name,
            username: req.user.username,
            posts: posts
        })
    })
        .sort('-postedAt')
})

module.exports = route