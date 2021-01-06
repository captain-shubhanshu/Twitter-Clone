const route = require('express').Router()
const User = require('../models/users')

route.get('/', (req, res, next) => {
    if (!req.user)
        return res.redirect('/login')
    User.find({ _id: { $in: req.user.following } }, (err, users) => {
        if (err) return next(err)
        return res.render('following', {
            title: 'Nagarro WebApp',
            subtitle: 'Following',
            name: req.user.name,
            username: req.user.username,
            users: users
        })
    })
        .select('-password -email')
})

module.exports = route