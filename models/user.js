const mongoose = require('mongoose');

const userSchema = new mongoose.Schema (
  {
    email: {
      required: true,
    },

    password: {
      required: true,
    }
  }
)

const User = mongoose.model('user', userSchema);

module.exports = User;