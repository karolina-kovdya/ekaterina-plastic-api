const router = require('express').Router();
const { get } = require('mongoose');
const { createImage, getImages } = require('../controllers/uploads')
const upload = require('../middlewares/upload')

router.post('/images', upload.single('image'), createImage)
router.get('/images', getImages)

module.exports = router