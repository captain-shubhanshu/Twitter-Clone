const route = require('express').Router()

route.get('/', (req, res) => {
    if (!req.user) {
        return res.redirect('/')
    }
    req.logout()
    return res.redirect('/login')
})

module.exports = route