const express = require('express')
const router = express.Router()
const Article = require('../models/Article')
const { isLoggedIn } = require('../config/utilities')

// edit form
router.get('/edit/:id', (req, res) => {
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
router.put('/:id', (req, res) => {
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
  Article.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.redirect('/articles')
    })
    .catch(err => {
      console.log(err)
    })
})

// form for new article
router.get('/new', isLoggedIn, (req, res) => {
  res.render('articles/new')
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
router.post('/', (req, res) => {
  Article.create({
    //   details
  })
    .then(article => {
      res.render('articles/view', { article: article })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
