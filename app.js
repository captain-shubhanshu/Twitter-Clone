const session = require('express-session')
const passport = require('./passport')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/usersdb')
const db = mongoose.connection
db.on('error', (err) => {
    console.error(err)
})

app.use(session({
    secret: 'bdlaoewigfwefb2394t23v43fi239f293fv203rfv32o',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'hbs')
app.get('/', (req, res) => {
    if (req.user)
        return res.redirect('/home')
    return res.render('main', {
        title: 'Nagarro WebApp'
    })
})
app.use('/explore', require('./routes/explore'))
app.use('/signup', require('./routes/signup'))
app.use('/login', require('./routes/login'))
app.use('/home', require('./routes/home'))
app.use('/profile', require('./routes/profile'))
app.use('/createpost', require('./routes/createpost'))
app.use('/logout', require('./routes/logout'))
app.use('/like', require('./routes/like'))
app.use('/unlike', require('./routes/unlike'))
app.use('/reply', require('./routes/reply'))
app.use('/follow', require('./routes/follow'))
app.use('/unfollow', require('./routes/unfollow'))
app.use('/following', require('./routes/following'))
app.use('/followers', require('./routes/followers'))

app.use((err, req, res, next) => {
    return res.render('error', {
        title: 'Error',
        message: err.message
    })
})

app.listen(4444, () => {
    console.log('Server started at http://localhost:4444')
})