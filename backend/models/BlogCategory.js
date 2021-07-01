const mongoose = require("mongoose");

const BlogCategory = new mongoose.Schema({
  date: String,
  name: String,
});

module.exports = mongoose.model("blogcategory", BlogCategory);
