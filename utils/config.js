require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/bitfilmsdb',
};
