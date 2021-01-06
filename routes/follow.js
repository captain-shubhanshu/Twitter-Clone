const route = require('express').Router()
const User = require('../models/users')
const methodOverride = require('method-override')

route.use(methodOverride('_method'))

route.get('/', (req, res) => {
    if (!req.user)
        return res.redirect('/login')
})

route.put('/', (req, res, next) => {
    User.findOneAndUpdate({
        $and: [
            { _id: req.query.followId },
            { followers: { $ne: req.user._id } }
        ]
    }, {
        $push: { followers: req.user._id }
    }, {
        new: true
    }, (err, user) => {
        if (err) return next(err)
        User.findOneAndUpdate({
            $and: [
                { _id: req.user._id },
                { following: { $ne: req.query.followId } }
            ]
        }, {
            $push: { following: req.query.followId }
        }, { new: true }, (err, user) => {
            if (err) return next(err)
            return res.redirect('/following')
        })
    })
})

module.exports = route