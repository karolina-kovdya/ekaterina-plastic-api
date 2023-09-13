const Section = require("../models/section");
const {
  CREATED,
  SECTION_NOT_FOUND,
  BAD_REQUEST,
} = require("../utils/constants");
const BadRequestError = require("../errors/badRequest_error");

const createdSection = (req, res, next) => {
  const { title } = req.body;

  Section.create({ title })
    .then((section) => res.status(CREATED).send(section))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Переданы некорректные данные"));

        return;
      }
      next(err);
    });
};

const getSections = (req, res, next) => {
  Section.find({})
    .sort({ createdAt: -1 })
    .then((sections) => res.send(sections))
    .catch((err) => next(err));
};

const deleteSection = (req, res, next) => {
  Section.findById(req.params._id)
    .then((section) => {
      if (!section) {
        throw new NotFoundError(SECTION_NOT_FOUND);
      }
      return section
        .deleteOne()
        .then(() => res.send({ message: "Раздел удален" }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

const updateSection = (req, res, next) => {
  Section.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { file: { src: req.file.path } } },
    { new: true }
  )
    .then((section) => res.send(section))
    .catch((err) => next(err));
};

const deleteFile = (req, res, next) => {
  Section.findByIdAndUpdate(
    req.params._id,
    { $pull: { file: { _id: req.body._id} } },
    { new: true }
    )
    .then((section) => res.send(section))
    .catch((err) => next(err));
};

module.exports = {
  createdSection,
  getSections,
  deleteSection,
  updateSection,
  deleteFile
};
