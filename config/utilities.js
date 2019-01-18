const Article = require('../models/Article')

const utils = {
  // check for logged in user
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.render('users/login', {
      message: 'You must be logged in to view this page.'
    })
  },
  isAuthor: (req, res, next) => {
    Article.findOne({ _id: req.params.id }).then(article => {
      if (req.user && req.user.id === article.createdBy.id) {
        return next()
      } else {
        res.render(`/articles/view`, {
          article: article,
          message:
            'You must be logged in as the creator of this post to edit or delete it.'
        })
      }
    })
  }
}

module.exports = utils
