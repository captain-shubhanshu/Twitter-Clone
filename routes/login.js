const route = require('express').Router()
const passport = require('passport')
const flash = require('connect-flash')

route.use(flash())

route.get('/', (req, res) => {
    if (req.user)
        return res.redirect('/home')
    return res.render('login', {
        title: 'Nagarro WebApp',
        subtitle: 'Login',
        message: req.flash('error')
    })
})

route.post('/', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}))

route.get('/facebook', passport.authenticate('facebook'))

route.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    successRedirect: '/home'
}))

route.get('/twitter', passport.authenticate('twitter'))

route.get('/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/login',
    successRedirect: '/home'
}))

module.exports = route