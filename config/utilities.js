const Article = require('../models/Article')
// request-promise and cheerio used for scraping info from links
const rp = require('request-promise')
const $ = require('cheerio')

const utils = {
  // check for logged in user
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.render('users/login', {
      message: 'You must be logged in to view this page.'
    })
  },
  // check that current user is post author for editing/deleting rights
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
  },
  // strip empty tags and enter as lowercase
  formatTags: arr => {
    let tags = arr.filter(tag => tag.length > 0)
    return tags.map(tag => tag.toLowerCase())
  },
  // scrape title from url entered by user
  scrapeTitle: url => {
    rp(url)
      .then(html => {
        let title = $('title', html).text()
        return title
      })
      .catch(err => {
        return false
      })
  }
}

module.exports = utils
