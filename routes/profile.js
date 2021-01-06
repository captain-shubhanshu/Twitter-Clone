const route = require('express').Router()
const Post = require('../models/posts')
const User = require('../models/users')
const flash = require('connect-flash')

route.get('/', (req, res, next) => {
    if (!req.user)
        return res.redirect('/login')
    Post.find({ postedBy: req.user._id }, (err, posts) => {
        if (err) return next(err)
        return res.render('profile', {
            title: 'Nagarro WebApp',
            subtitle: 'Profile',
            name: req.user.name,
            username: req.user.username,
            posts: posts,
            followers: req.user.followers.length,
            following: req.user.following.length,
        })
    })
})

route.get('/users', (req, res, next) => {
    if (!req.user)
        return res.redirect('/login')
    User.find({
        $and: [
            { username: req.query.username },
            { _id: { $ne: req.user._id } }
        ]
    }, (err, users) => {
        if (err) return next(err)
        return res.render('users', {
            title: 'Nagarro WebApp',
            subtitle: 'Users',
            name: req.user.name,
            username: req.user.username,
            searchedUsername: req.query.username,
            users: users
        })
    }).select('-password -email')
})

route.get('/user', (req, res, next) => {
    if (!req.user)
        return res.redirect('/login')
    User.findOne({ _id: req.query.id }, (err, user) => {
        if (err) return next(err)
        Post.find({ postedBy: req.query.id }, (err, posts) => {
            if (err) return next(err)
            return res.render('profile', {
                title: 'Nagarro WebApp',
                subtitle: 'Profile',
                name: user.name,
                username: user.username,
                posts: posts,
                following: user.following.length,
                followers: user.followers.length
            })
        })
    })
})

module.exports = route