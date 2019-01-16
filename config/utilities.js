const utils = {
  // check for logged in user
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.render('auth/login', {
      message: 'You must be logged in to view this page.'
    })
  }
}

module.exports = utils
