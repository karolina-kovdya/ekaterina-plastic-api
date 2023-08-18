const Images = require('../models/images')
const { CREATED, SECTION_NOT_FOUND, BAD_REQUEST } = require('../utils/constants')

// const createImage = async function (req, res) {
//   const images = new Images({
//     imageSrc: req.file.path
//   })

//   try {
//     await images.save()
//     res.status(CREATED).json(images)
//   } catch (err) {
//     console.log(err)
//   }
// }

const createImage = (req, res, next) => {
  const images = new Images({
    imageSrc: req.file.path
  })

  images.save()
    .then((image) => res.status(CREATED).send(image))
    .catch((err) => {
      next(err);
    });
};

const getImages = (req, res, next) => {
  Images.find({}).sort({ createdAt: -1 })
    .then((images) => res.send(images))
    .catch((err) => next(err));
};

module.exports = {
  createImage, getImages
}