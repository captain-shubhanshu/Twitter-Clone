const route = require('express').Router()
const Post = require('../models/posts')

route.get('/', (req, res) => {
    if (!req.user)
        return res.redirect('/login')
    return res.render('createpost', {
        title: 'Nagarro WebApp',
        subtitle: 'Create Post',
        name: req.user.name,
        username: req.user.username,
    })
})

route.post('/', (req, res, next) => {
    let postData = {
        title: req.body.title,
        content: req.body.content,
        authorName: req.user.name,
        authorEmail: req.user.email,
        postedBy: req.user._id
    }
    Post.create(postData, (err, post) => {
        if (err) return next(err)
        return res.redirect('/home')
    })
})

module.exports = route
