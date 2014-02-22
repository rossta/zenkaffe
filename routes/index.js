var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');

/*
 * GET home page.
 */

exports.index = function(req, res) {
  Quote.findRandom(function(err, quote){
    console.log(err, 'error');
    console.log(quote, 'found');
    res.render('index', { title: 'ZenKaffé', quote: quote });
  });
};
