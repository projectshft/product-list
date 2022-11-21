const errLogger = (err, req, res, next) => {
  console.error('errLogger middleware caught this: ', err);
  next(err);
}

module.exports = errLogger;