const route = require('express').Router()
const Post = require('../models/posts')
const methodOverride = require('method-override')

route.use(methodOverride('_method'))

route.get('/', (req, res) => {
    if (!req.user)
        return res.redirect('/login')
})

route.put('/', (req, res, next) => {
    Post.findOneAndUpdate({
        $and: [
            { _id: req.query.postId },
            { likes: { $ne: req.user._id } }
        ]
    }, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }, (err, post) => {
        if (err) return next(err)
        return res.redirect('/home')
    })
})

module.exports = route