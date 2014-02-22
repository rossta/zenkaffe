var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Quote = new Schema({
  text: { type: String, required: true },
  author_id: String,
  created_at: Date,
  updated_at: Date
});

Quote.statics.findRandom = function(callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

mongoose.model('Quote', Quote);
