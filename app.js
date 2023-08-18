const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const helmet = require('helmet')
const userRoutes = require('./routes/user');
const sectionRoutes = require('./routes/section');
const uploadsRoutes = require('./routes/uploads')
const NotFoundError = require('./errors/notFound_error');

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use('/images', express.static('images'));
app.use('/', userRoutes);
app.use('/', sectionRoutes);
app.use('/', uploadsRoutes);
app.use((error, req, res, next) => {
  console.log('This is the rejected field ->', error.field);
});
app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});


const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://localhost:27017/ekaterinadb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
