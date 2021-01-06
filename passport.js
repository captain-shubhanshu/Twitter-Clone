const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const User = require('./models/users')
const bcrypt = require('bcrypt')


passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
        if (err) return done(err)
        if (!user) return done(null, false, { message: 'Incorrect username!' })
        bcrypt.compare(password, user.password, (err, result) => {
            if (result == false)
                return done(null, false, { message: 'Incorrect password!' })
            else
                return done(null, user)
        })
    })
}
))

passport.use(new FacebookStrategy({
    clientID: '2839280379681242',
    clientSecret: '71dffbe25bc62da4722547264260cb99',
    callbackURL: 'http://localhost:4444/login/facebook/callback'
}, async (accessToken, refreshToken, profile, cb) => {
    let user = await User.findOne({ fbId: profile.id })
    if (user) return cb(null, user)
    user = await User.create({
        fbId: profile.id,
        fbToken: accessToken,
        name: profile.displayName
    })
    return cb(null, user)
}))

passport.use(new TwitterStrategy({
    consumerKey: 'HbZahsnyB3vI1ZcMCtDeG9RFJ',
    consumerSecret: '7GeFm3ZXgESRibqeis8JeKQNuUJ52W5U5GS0E4fFYvyzTgFag3',
    callbackURL: 'http://localhost:4444/login/twitter/callback'
}, async (token, tokenSecret, profile, cb) => {
    let user = await User.findOne({ twitterId: profile.id })
    if (user) return cb(null, user)
    user = await User.create({
        twitterId: profile.id,
        twitterToken: token,
        name: profile.displayName
    })
    return cb(null, user)
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) return done(err)
        return done(null, user)
    })
})

module.exports = passport