const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema (
  {
    src: {
      type: String,
    },
  }
)

const Images = mongoose.model('images', imagesSchema);

module.exports = Images;