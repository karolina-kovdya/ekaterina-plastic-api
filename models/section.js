const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema (
  {
    title: {
      type: String,
      required: true,
    },
    file: [{
      src: {
        type: String
      }
    }]
  }
)

const Section = mongoose.model('section', sectionSchema);

module.exports = Section;