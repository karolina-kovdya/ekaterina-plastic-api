const router = require('express').Router();
const { createdSection, getSections, deleteSection } = require('../controllers/section')

router.post('/technical/section', createdSection)
router.get('/technical', getSections)
router.delete('/technical/section/:_id', deleteSection)

module.exports = router;