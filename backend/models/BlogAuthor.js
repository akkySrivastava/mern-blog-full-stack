const mongoose = require("mongoose");

const BlogAuthor = new mongoose.Schema({
  name: String,
  description: String,
  date: String,
  authorImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
});

module.exports = mongoose.model("blogauthors", BlogAuthor);
