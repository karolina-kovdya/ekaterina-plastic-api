const Section = require('../models/section')
const { CREATED } = require('../utils/constants')
const BadRequestError = require('../errors/badRequest_error');
const createdSection = (req, res, next) => {
  const { title } = req.body;

  Section.create({ title })
    .then((section) => res.status(CREATED).send(section))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));

        return;
      }
      next(err);
    });
};

const getSections = (req, res, next) => {
  Section.find({}).sort({ createdAt: -1 })
    .then((sections) => res.send(sections))
    .catch((err) => next(err));
};

module.exports = {
  createdSection, getSections
}