
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  image: String
});

module.exports = mongoose.model('Blog', contentSchema);
