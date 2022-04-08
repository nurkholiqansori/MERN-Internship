const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../schema/index')
const User = db.user
require('dotenv').config('/.env' )

exports.signUp = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  })

  user.save((err, user) => {
    if (err) {
      return res.status(500).json(err)
    }
    res.status(201).send({
      message: 'User created',
      user: user
    })
  })
}

exports.signIn = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).json({
        error: err,
      })
    }
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      })
    }

    const token = jwt.sign({id : user.id}, process.env.SECRET, {
      expiresIn: 86400
    })

    res.status(200).send({
      id: user._id,
      status: 'success',
      message: 'User found & logged in',
      username: user.username,
      email: user.email,
      accessToken: token,
    })
  })
}
