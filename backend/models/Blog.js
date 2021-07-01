const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogcategory",
  },
});

const BlogSchema = new mongoose.Schema({
  blogTitle: String,
  blogCategory: [categorySchema],
  blogShortDescription: String,
  metaDescription: String,
  blogDate: String,
  blogBody: String,
  blogBanner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  blogCardBanner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  blogAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogauthors",
  },
});

module.exports = mongoose.model("blog", BlogSchema);
