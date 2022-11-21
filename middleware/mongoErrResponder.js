const AppError = require("../errors/errClass");

const handleBSONTypeError = (err, req, res, next) => {
  res.status(400).send('Check Product ID! Incorrectly Formatted Request!'); 
}

const handleCastErrorDB = (err, req, res, next) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  const error = new AppError(message, 400);
  res.status(error.statusCode).send(error.message);
};

const handleDuplicateFieldsDB = (err, req, res, next) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use anothe value!`;
  const error = new AppError(message, 400);
  res.status(error.statusCode).send(error.message);

};

const handleValidationErrorDB = (err, req, res, next) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  const error = new AppError(message, 400);
  res.status(error.statusCode).send(error.message);
};

const mongoErrResponder = (err, req, res, next) => {
  if (err.name == "BSONTypeError") {
    handleBSONTypeError(err);
  }
  if (err.name === 'CastError') {
    handleCastErrorDB(err);
  }
  if (err.code === 11000) {
    handleDuplicateFieldsDB(err);
  }
  if (err.name === 'ValidationError') {
    handleValidationErrorDB(err);
  }
  next(err);
}
module.exports = mongoErrResponder;
