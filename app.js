const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet')
const routes = require('./routes/user');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(routes)

const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://localhost:27017/ekaterinadb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
