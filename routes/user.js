const router = require('express').Router();
const NotFoundError = require('../errors/notFound_error')
const { PAGE_NOT_FOUND } = require('../utils/constants')
const { createUser, loginUser } = require('../controllers/user');

router.post('/signup', createUser);
router.post('/admin', loginUser);

router.use(((req, res, next) => {
    next(new NotFoundError(PAGE_NOT_FOUND));
  }));

module.exports = router;