const route = require('express').Router()
const Post = require('../models/posts')
const methodOverride = require('method-override')

route.use(methodOverride('_method'))

route.get('/', (req, res) => {
    if (!req.user)
        return res.redirect('/login')
})

route.put('/', (req, res, next) => {
    Post.findByIdAndUpdate(
        req.query.postId,
        {
            $pull: { likes: req.user._id }
        },
        {
            new: true
        },
        (err, post) => {
            if (err) return next(err)
            return res.redirect('/home')
        }
    )
})

module.exports = route
