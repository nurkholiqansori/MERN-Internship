const mongoose = require('mongoose')

const postsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    lowercase: true,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const Posts = mongoose.model('posts', postsSchema, 'posts')

module.exports = Posts
