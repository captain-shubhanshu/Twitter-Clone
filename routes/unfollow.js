const route = require('express').Router()
const User = require('../models/users')
const methodOverride = require('method-override')

route.use(methodOverride('_method'))

route.get('/', (req, res) => {
    if (!req.user)
        return res.redirect('/login')
})

route.put('/', (req, res, next) => {
    User.findByIdAndUpdate(req.query.unfollowId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    }, (err, user) => {
        if (err) return next(err)
        User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.query.unfollowId }
        }, { new: true }, (err, user) => {
            if (err) return next(err)
            return res.redirect('/following')
        })
    })
})

module.exports = route