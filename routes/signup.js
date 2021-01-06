const route = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const flash = require('connect-flash')

route.use(flash())

route.get('/', (req, res) => {
    return res.render('signup', {
        title: 'Nagarro WebApp',
        subtitle: 'Signup',
        message: req.flash('error')
    })
})

route.post('/', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return next(err)
        let userData = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hash
        }

        User.create(userData, (err, user) => {
            if (err) {
                req.flash('error', 'User already exists!')
                return res.redirect('/signup')
            }
            return res.redirect('/login')
        })
    })
})

module.exports = route