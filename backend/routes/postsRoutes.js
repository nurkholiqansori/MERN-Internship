const express = require('express')
const app = express()
const postModel = require('../schema/postsSchema')

// CREATE
app.post('/api/add-article', async (req, res) => {
  const post = new postModel(req.body)
  await post.save()
  res.status(200).send(post)
})

// READ
app.get('/api/articles', async (req, res) => {
  const post = await postModel.find({})
  res.status(200).send(post)
})
app.get('/api/article/:url', async (req, res) => {
  const post = await postModel.find({ url: req.params.url })
  res.status(200).send(post)
})

// UPDATE
app.put('/api/update-data/:url', async (req, res) => {
  const post = await postModel.findOneAndUpdate(
    { url: req.params.url },
    {
      $set: {
        image: req.body.image,
        title: req.body.title,
        url: req.body.url,
        description: req.body.description,
      },
    },
  )
  res.status(200).send(post)
})

// DELETE
app.delete('/api/delete-article', async (req, res) => {
  const post = await postModel.findOneAndDelete({ url: req.body.url })
  res.status(200).send(post)
})

module.exports = app
