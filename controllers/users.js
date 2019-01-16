const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../config/passport')(passport)
const { isLoggedIn } = require('../config/utilities')

router.get('/login', (req, res) => {
  res.render('users/login', { message: req.flash('loginMessage') })
})

router.get('/signup', (req, res) => {
  res.render('users/signup', { message: req.flash('signupMessage') })
})

router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })
)

router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/users/signup',
    failureFlash: true
  })
)

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
