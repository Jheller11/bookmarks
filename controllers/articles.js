const express = require('express')
const router = express.Router()
const Article = require('../models/Article')
const User = require('../models/User')
const { isLoggedIn, isAuthor, formatTags } = require('../config/utilities')

// form for new article
router.get('/new', isLoggedIn, (req, res) => {
  res.render('articles/new')
})

// keyword search
router.post('/search', (req, res, next) => {
  let matchingArticles = []
  Article.find({})
    .then(articles => {
      articles.forEach(article => {
        if (article.tags.includes(req.body.query.toLowerCase())) {
          matchingArticles.push(article)
        }
      })
    })
    .then(() => {
      res.render('articles/search', { articles: matchingArticles })
    })
    .catch(err => {
      next(err)
    })
})

// only articles added by an individual user
router.get('/my_articles', isLoggedIn, (req, res, next) => {
  Article.find({ 'createdBy.id': req.user.id })
    .then(articles => {
      res.render('articles/index', { articles: articles })
    })
    .catch(err => {
      next(err)
    })
})

// edit form
router.get('/edit/:id', isAuthor, (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .then(article => {
      res.render('articles/edit', { article: article })
    })
    .catch(err => {
      next(err)
    })
})

// view
router.get('/:id', (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .then(article => {
      res.render('articles/view', { article: article })
    })
    .catch(err => {
      next(err)
    })
})

// update
router.put('/:id', isAuthor, (req, res, next) => {
  let newTags = formatTags(req.body.tags)
  req.body.tags = newTags
  Article.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(article => {
      res.render('articles/view', { article: article })
    })
    .catch(err => {
      next(err)
    })
})

// delete
router.delete('/:id', (req, res, next) => {
  Article.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.redirect('/articles')
    })
    .catch(err => {
      next(err)
    })
})

// index
router.get('/', (req, res, next) => {
  Article.find({})
    .then(articles => {
      res.render('articles/index', { articles: articles })
    })
    .catch(err => {
      next(err)
    })
})

// post
router.post('/', isLoggedIn, (req, res, next) => {
  let newTags = formatTags(req.body.tags)
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
        next(err)
      })
  })
})

module.exports = router
