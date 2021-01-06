const route = require('express').Router()
const Post = require('../models/posts')

route.get('/', (req, res, next) => {
    if (!req.user)
        return res.redirect('/login')
    Post.find({ postedBy: { $in: req.user.following } }, (err, posts) => {
        if (err) return next(err)
        return res.render('home', {
            title: 'Nagarro WebApp',
            subtitle: 'Home',
            name: req.user.name,
            username: req.user.username,
            posts: posts
        })
    })
        .sort('-postedAt')

})

module.exports = route