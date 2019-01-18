const express = require('express')
const router = express.Router()
require('dotenv').config()

// access point to admin dashboard
router.get('/login', (req, res) => {
  res.render('admin/login')
})

// verify admin passcode
router.post('/login', (req, res) => {
  if (req.body.passcode) {
    if (req.body.passcode === process.env.ADMIN_PASSCODE) {
      res.redirect('/admin/dashboard')
    } else {
      res.render('admin/login', {
        message: 'Incorrect code. Please try again.'
      })
    }
  }
})

//  view dashboard
router.get('/dashboard', (req, res) => {
  res.render('admin/dashboard')
})

module.exports = router
