const express = require('express')
const router = express.Router()
const Video = require('../models/Video')
const User = require('../models/User')
const { isLoggedIn, isAuthor, formatTags } = require('../config/utilities')

// get form
router.get('/new', (req, res) => {
  res.render('videos/new')
})

// keyword search
router.post('/search', (req, res) => {
  let matchingVideos = []
  Video.find({})
    .then(videos => {
      videos.forEach(video => {
        if (video.tags.includes(req.body.query.toLowerCase())) {
          matchingVideos.push(video)
        }
      })
    })
    .then(() => {
      res.render('videos/search', { videos: matchingVideos })
    })
    .catch(err => {
      console.log(err)
    })
})

// only videos added by an individual user
router.get('/my_videos', isLoggedIn, (req, res) => {
  Video.find({ createdBy: req.user.id }).then(videos => {
    res.render('articles/index', { videos: videos })
  })
})

// edit form
router.get('/edit/:id', isAuthor, (req, res) => {
  Video.findOne({ _id: req.params.id })
    .then(video => {
      res.render('videos/edit', { video: video })
    })
    .catch(err => {
      console.log(err)
    })
})

// view
router.get('/:id', (req, res) => {
  Video.findOne({ _id: req.params.id })
    .then(video => {
      res.render('videos/view', { video: video })
    })
    .catch(err => {
      console.log(err)
    })
})

// update
router.put('/:id', isAuthor, (req, res) => {
  let newTags = formatTags(req.body.tags)
  req.body.tags = newTags
  Video.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(video => {
      res.render('videos/view', { video: video })
    })
    .catch(err => {
      console.log(err)
    })
})

// delete
router.delete('/:id', (req, res) => {
  Video.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.redirect('/videos')
    })
    .catch(err => {
      console.log(err)
    })
})

// index
router.get('/', (req, res) => {
  Video.find({})
    .then(videos => {
      res.render('videos/index', { videos: videos })
    })
    .catch(err => {
      console.log(err)
    })
})

// post
router.post('/', isLoggedIn, (req, res) => {
  let newTags = formatTags(req.body.tags)
  User.findOne({ _id: req.user.id }).then(user => {
    let userInfo = { name: user.local.displayName, id: user.id }
    Video.create({
      title: req.body.title,
      youtubeId: req.body.youtubeId,
      tags: newTags,
      notes: req.body.notes,
      createdBy: userInfo
    })
      .then(video => {
        res.redirect('/videos')
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
