const jwt  = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({
      message: 'No token provided',
    });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized',
      });
    }
    req.userId = decoded.id;
    next();
  });
}

const isAdmin = (req, res, next) => {
  Users.findById(req.userId, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: 'Error when getting user',
      });
    }
    if (!user) {
      return res.status(404).send({
        message: 'No user found',
      });
    }
    if (user.role.name !== 'admin') {
      return res.status(403).send({
        message: 'Unauthorized',
      });
    }
    next();
  });
}

module.exports = {
  verifyToken,
  isAdmin,
};
