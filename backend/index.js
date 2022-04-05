const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const cors = require('cors')
const app = express()
const port = 8000

const url = 'mongodb://localhost:27017'
const dbName = 'mern_lecturer'

app.use(bodyParser.json())
app.use(cors())

MongoClient.connect(url).then((client) => {
  console.log('Berhasil terhubung dengan database')
  const db = client.db(dbName)

  // READ
  app.get('/api/articles', (req, res) => {
    db.collection('posts')
      .find()
      .toArray()
      .then((data) => res.status(200).send(data))
  })
  app.get('/api/article/:url', (req, res) => {
    db.collection('posts')
      .find({ url: req.params.url })
      .toArray()
      .then((data) => res.status(200).send(data))
  })

  // CREATE
  app.post('/api/add-article', (req, res) => {
    db.collection('posts')
      .insertOne(req.body)
      .catch((err) => console.error(err))
  })

  // UPDATE
  app.put('/api/update-data/:url', (req, res) => {
    db.collection('posts')
      .updateOne(
        { url: req.params.url },
        {
          $set: {
            image: req.body.image,
            title: req.body.title,
            url: req.body.url,
            description: req.body.description,
          },
        } 
      )
  })

  // DELETE
  app.delete('/api/delete-article', (req, res) => {
    db.collection('posts').deleteOne({ url: req.body.url })
  })
})

app.listen(port, () => {
  console.log('Server is running on port 8000')
})
