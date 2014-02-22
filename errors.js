exports.log = function(err, req, res, next) {
  console.log(err.stack);
  next(err);
};

exports.client = function(err, req, res, next) {
  if (err.name == 'ValidationError') {
    res.send(422, err);
  } else {
    next(err);
  }
};

exports.server = function(err, req, res, next) {
  res.send(500, err);
};

