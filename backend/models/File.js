var mongoose = require("mongoose");

var FileSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  originalName: String,
  mimeType: String,
  directoryPath: String,
  filePath: {
    type: String,
    unique: true,
    required: true,
  },
  size: Number,
  createdAt: Date,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("File", FileSchema);
