var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');

exports.index = function(req, res) {
  Quote.find().select('text').exec(function(err, quotes, count) {
    res.send(quotes);
  });
};

exports.show = function(req, res, next) {
  Quote.findById(req.params.id, 'text', function(err, quote) {
    if (err) next(err);
    res.send(quote);
  });
};

exports.random = function(req, res, next) {
  Quote.findRandom(function(err, quote) {
    if (err) next(err);
    res.send(quote.text);
  });
};

exports.create = function(req, res, next) {
  new Quote({
    text: req.body.text,
      created_at: Date.now(),
      updated_at: Date.now()
  }).save(function(err, quote, count){
    if (err) return next(err);
    console.log('Success: new quote created', quote);
    res.send(quote);
  });
};

exports.destroy = function(req, res, next) {
  Quote.findById(req.params.id, function(err, quote) {
    quote.remove(function(err, quote) {
      if (err) return next(err);
      console.log('Success: quote removed', quote);
      res.send(quote);
    });
  });
};
