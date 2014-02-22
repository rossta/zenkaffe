var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Quote = new Schema({
  text: { type: String, required: true },
  author_id: String,
  created_at: Date,
  updated_at: Date
});

mongoose.model('Quote', Quote);
