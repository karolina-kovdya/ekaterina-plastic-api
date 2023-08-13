const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const BadRequestError = require('../errors/badRequest_error');
const UnauthorizedError = require('../errors/unauthorized_error');
const NotFoundError = require('../errors/notFound_error')
const { BAD_REQUEST, CREATED, BAD_EMAIL_PASSWORD } = require('../utils/constants')

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {username, password} = req.body

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      username, password: hash,
    })
      .then((user) => res.status(CREATED).send({
        _id: user._id,
        user: user.username,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(BAD_REQUEST));
          return;
        } if (err.code === 11000) {
          next(new ConflictError(DUBLICATE));
          return;
        }
        next(err);
      }));
};

const loginUser = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username }).select('+password')
    .orFail(() => {
      throw new UnauthorizedError((BAD_EMAIL_PASSWORD));
    })
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (matched) {
          return user;
        }
        throw new UnauthorizedError((BAD_EMAIL_PASSWORD));
      }))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'my-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST));
        return;
      }
      next(err);
    });
};

module.exports = {
  createUser, loginUser
}



