const router = require('express').Router();
const { createdSection } = require('../controllers/section')

router.post('/technical/section', createdSection)

module.exports = router;