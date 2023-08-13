const router = require('express').Router();
const NotFoundError = require('../errors/notFound_error')
const { createUser, loginUser } = require('../controllers/user');

router.post('/signup', createUser);
router.post('/admin', loginUser);

module.exports = router;