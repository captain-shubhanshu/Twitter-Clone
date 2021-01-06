const route = require('express').Router()
const Post = require('../models/posts')
const methodOverride = require('method-override')

route.use(methodOverride('_method'))

route.get('/', (req, res) => {
    if (!req.user)
        return res.redirect('/login')
})

route.put('/', (req, res, next) => {
    if (!req.user)
        return res.redirect('/login')
    let reply = {
        text: req.body.reply,
        repliedBy: req.user._id,
        name: req.user.name
    }
    Post.findByIdAndUpdate(req.query.postId, {
        $push: { replies: reply }
    }, {
        new: true
    }, (err, post) => {
        if (err) return next(err)
        return res.redirect('/home')
    })
})

module.exports = route