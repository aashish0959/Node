const mongoose = require("mongoose");
const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  published_date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
const firstSchema = mongoose.model("student", schema);

module.exports = firstSchema;
