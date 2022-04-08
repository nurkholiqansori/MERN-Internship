const express = require('express');
const authController = require('../controllers/authController');
const verifySignUp = require('../middlewares/verifySignUp');
const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.post('/api/signup', verifySignUp.checkDuplicateUser, authController.signUp)
app.post('/api/signin', authController.signIn)

module.exports = app;
