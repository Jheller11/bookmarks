const express = require('express')
const router = express.Router()
const Article = require('../models/Article')
const User = require('../models/User')
const { isLoggedIn, isAuthor } = require('../config/utilities')

// form for new article
router.get('/new', isLoggedIn, (req, res) => {
  res.render('articles/new')
})

// keyword search
router.post('/search', (req, res) => {
  let matchingArticles = []
  Article.find({})
    .then(articles => {
      articles.forEach(article => {
        if (article.tags.includes(req.body.query)) {
          matchingArticles.push(article)
        }
      })
    })
    .then(() => {
      res.render('articles/search', { articles: matchingArticles })
    })
    .catch(err => {
      console.log(err)
    })
})

// only articles added by an individual user
router.get('/my_articles', isLoggedIn, (req, res) => {
  Article.find({ createdBy: req.user.id }).then(articles => {
    res.render('articles/index', { articles: articles })
  })
})

// only unread articles
router.get('/unread', (req, res) => {
  Article.find({ read: false })
    .then(articles => {
      res.render('articles/index', { articles: articles })
    })
    .catch(err => {
      console.log(err)
    })
})

// only read articles
router.get('/read', (req, res) => {
  Article.find({ read: true })
    .then(articles => {
      res.render('articles/index', { articles: articles })
    })
    .catch(err => {
      console.log(err)
    })
})

// mark as unread
router.put('/unread/:id', isAuthor, (req, res) => {
  Article.findOneAndUpdate(
    { _id: req.params.id },
    { read: false },
    { new: true }
  )
    .then(article => {
      res.render('articles/view', { article: article })
    })
    .catch(err => {
      console.log(err)
    })
})

// mark as read
router.put('/read/:id', isAuthor, (req, res) => {
  Article.findOneAndUpdate(
    { _id: req.params.id },
    { read: true },
    { new: true }
  )
    .then(article => {
      res.render('articles/view', { article: article })
    })
    .catch(err => {
      console.log(err)
    })
})

// edit form
router.get('/edit/:id', isAuthor, (req, res) => {
  Article.findOne({ _id: req.params.id })
    .then(article => {
      res.render('articles/edit', { article: article })
    })
    .catch(err => {
      console.log(err)
    })
})

// view
router.get('/:id', (req, res) => {
  Article.findOne({ _id: req.params.id })
    .then(article => {
      res.render('articles/view', { article: article })
    })
    .catch(err => {
      console.log(err)
    })
})

// update
router.put('/:id', isAuthor, (req, res) => {
  let newTags = req.body.tags.filter(tag => tag.length > 0)
  req.body.tags = newTags
  Article.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(article => {
      res.render('articles/view', { article: article })
    })
    .catch(err => {
      console.log(err)
    })
})

// delete
router.delete('/:id', (req, res) => {
  Article.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.redirect('/articles')
    })
    .catch(err => {
      console.log(err)
    })
})

// index
router.get('/', (req, res) => {
  Article.find({})
    .then(articles => {
      res.render('articles/index', { articles: articles })
    })
    .catch(err => {
      console.log(err)
    })
})

// post
router.post('/', isLoggedIn, (req, res) => {
  let newTags = req.body.tags.filter(tag => tag.length > 0)
  User.findOne({ _id: req.user.id }).then(user => {
    let userInfo = { name: user.local.displayName, id: user.id }
    Article.create({
      title: req.body.title,
      url: req.body.url,
      tags: newTags,
      notes: req.body.notes,
      createdBy: userInfo
    })
      .then(article => {
        res.redirect('/articles')
      })
      .catch(err => {
        console.log(err)
      })
  })
})

// 404
router.get('/*', (req, res) => {
  res.render('404', {
    message: 'The page you requested does not exist. Please try again.'
  })
})

module.exports = router
