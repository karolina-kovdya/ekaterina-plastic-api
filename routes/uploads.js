const router = require('express').Router();
const { get } = require('mongoose');
const { createImage, getImages } = require('../controllers/uploads')
const upload = require('../middlewares/upload')

router.post('/upload', upload.single('image'), createImage)
router.get('/upload', getImages)

module.exports = router