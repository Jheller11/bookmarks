const mongoose = require('../db/connection')

const videoSchema = new mongoose.Schema({
  created: {
    type: Date,
    required: true,
    default: Date.now()
  },
  tags: {
    type: Array,
    default: []
  },
  createdBy: {
    name: { type: String, required: true },
    id: { type: String, required: true }
  },
  title: {
    type: String,
    required: true
  },
  youtubeId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Video', videoSchema)
