const mongoose = require('../db/connection')

const articleSchema = new mongoose.Schema({
  created: {
    type: Date,
    required: true,
    default: Date.now()
  },
  read: {
    type: Boolean,
    required: true,
    default: false
  },
  tags: {
    type: Array,
    default: []
  },
  createdBy: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Article', articleSchema)
