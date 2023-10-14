const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const helmet = require('helmet')
const userRoutes = require('./routes/user');
const sectionRoutes = require('./routes/section');
const NotFoundError = require('./errors/notFound_error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use('*', cors());

const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(requestLogger);
helmet({
  crossOriginResourcePolicy: false,
})

app.use('/uploads', express.static('uploads'));
app.use('/api', userRoutes);
app.use('/api', sectionRoutes);
app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

mongoose.connect('mongodb://localhost:27017/ekaterinadb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
