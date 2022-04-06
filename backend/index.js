const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const routesPosts = require('./routes/postsRoutes')

const port = 8000
const urlDB = 'mongodb://localhost:27017/mern_lecturer'

app.use(bodyParser.json())
app.use(cors())

mongoose
  .connect(urlDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    console.log(
      'Package Mongoose tersambung\n\x1b[33mBerhasil tersambung ke database\x1b[0m',
    ),
  )
  .catch((err) => console.log(err))

app.use(routesPosts)

app.listen(port, () => {
  console.log('Server is running on port \x1b[31m' + port + '\x1b[0m')
})
