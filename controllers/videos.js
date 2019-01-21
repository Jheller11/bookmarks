const express = require('express')
const router = express.Router()
const Video = require('../models/Video')

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

// post new video
router.post('/', (req, res) => {
  Video.create(req.body)
    .then(video => {
      res.render('videos/view', { video: video })
    })
    .catch(err => {
      console.log(err)
    })
})

// view single video
router.get('/:id', (req, res) => {
  Video.findOne({ _id: req.params.id }).then(video => {
    res.render('videos/view', { video: video })
  })
})

// delete a video
router.delete('/:id', (req, res) => {
  Video.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.redirect('/videos')
    })
    .catch(err => {
      console.log(err)
    })
})

// get all videos
router.get('/', (req, res) => {
  Video.find({})
    .then(videos => {
      res.render('videos/index', { videos: videos })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
