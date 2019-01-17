const express = require('express')
const router = express.Router()
const Article = require('../models/Article')
const { isLoggedIn } = require('../config/utilities')

// form for new article
router.get('/new', isLoggedIn, (req, res) => {
  res.render('articles/new')
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
router.put('/unread/:id', (req, res) => {
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
router.put('/read/:id', (req, res) => {
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
router.get('/edit/:id', isLoggedIn, (req, res) => {
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
router.put('/:id', isLoggedIn, (req, res) => {
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
  console.log('here')
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
  Article.create({
    title: req.body.title,
    url: req.body.url,
    tags: req.body.tags.split(', '),
    notes: req.body.notes,
    createdBy: req.user.id
  })
    .then(article => {
      res.redirect('/articles')
    })
    .catch(err => {
      console.log(err)
    })
})

// 404
router.get('/*', (req, res) => {
  res.render('404', {
    message: 'The page you requested does not exist. Please try again.'
  })
})

module.exports = router
