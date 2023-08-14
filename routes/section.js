const router = require('express').Router();
const { createdSection, getSections } = require('../controllers/section')

router.post('/technical/section', createdSection)
router.get('/technical', getSections)

module.exports = router;