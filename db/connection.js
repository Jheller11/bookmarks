const mongoose = require('mongoose')
mongoose.Promise = Promise

mongoose.connect(
  'mongodb://localhost/study-app',
  { useNewUrlParser: true }
)

module.exports = mongoose
