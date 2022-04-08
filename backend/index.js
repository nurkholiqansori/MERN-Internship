const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const routersPosts = require('./routes/postsRoutes')
const routersAuth = require('./routes/authRoutes')
const db = require('./schema/index')

const port = 8000
const urlDB = 'mongodb://localhost:27017/mern_lecturer'
const corsOption = {
  origin: 'http://localhost:3000'
}

app.use(bodyParser.json())
app.use(cors(corsOption))

db.mongoose
  .connect(urlDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(
      '\n\x1b[33mBerhasil tersambung ke database\x1b[0m',
    )
  }
  )
  .catch((err) => console.log(err))

app.use(routersAuth)
app.use(routersPosts)

app.listen(port, () => {
  console.log('Server is running on port \x1b[31m' + port + '\x1b[0m')
})
