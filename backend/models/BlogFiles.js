const mongoose = require("mongoose");

const BlogFilesSchema = new mongoose.Schema({
  blogFile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
});

module.exports = mongoose.model("blogfiles", BlogFilesSchema);
