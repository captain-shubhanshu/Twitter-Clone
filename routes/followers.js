const route = require('express').Router()
const User = require('../models/users')

route.get('/', (req, res, next) => {
    if (!req.user)
        return res.redirect('/login')
    User.find({ _id: { $in: req.user.followers } }, (err, users) => {
        if (err) return next(err)
        return res.render('followers', {
            title: 'Nagarro WebApp',
            subtitle: 'Followers',
            name: req.user.name,
            username: req.user.username,
            users: users
        })
    })
        .select('-password -email')
})

module.exports = route