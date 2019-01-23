const mongoose = require('../db/connection')

const articleSchema = new mongoose.Schema({
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
  notes: {
    type: String
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
