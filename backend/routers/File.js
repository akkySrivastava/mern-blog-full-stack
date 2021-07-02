require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const File = require("../models/File");
const multer = require("multer");
const creds = require("../creds.json");
const path = require("path");
const cloud = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloud.config({
  cloud_name: process.env.CLOUD_NAME || creds.CLOUD_NAME,
  api_key: process.env.API_KEY || creds.API_KEY,
  api_secret: process.env.API_SECRET || creds.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloud,
  params: {
    folder: "blog-images",
    public_id: (req, file) => file.filename,
  },
});

const parser = multer({ storage: storage });

router.post("/", parser.single("files"), async (req, res) => {
  const file = req.file;
  console.log("uploading...");
  const fileData = new File({
    _id: new mongoose.Types.ObjectId(),
    originalName: file.originalName,
    mimeType: file.mimetype,
    filePath: file.path,
    size: file.size,
    createdAt: new Date().toISOString(),
  });

  await fileData
    .save()
    .then((doc) => {
      res.status(201).send({ fileId: doc._id });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ message: "Error adding file" });
    });
});

router.get("/", (req, res) => {
  const error = {
    message: "Error in retreiving the files",
    error: "Bad Request",
  };
  File.find({ createdBy: req.userId })
    .select({ originalName: 1, filePath: 1, mimeType: 1, size: 1 })
    .exec()
    .then((files) => {
      res.send(files);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(error);
    });
});

router.get("/:id", (req, res) => {
  const error = {
    message: "Error in retreiving the file",
    error: "Bad Request",
  };
  const id = mongoose.Types.ObjectId(req.params.id);
  // File.find({ createdBy: req.userId, _id: id })
  File.find({ _id: id })
    .select({ originalName: 1, filePath: 1, mimeType: 1, size: 1 })
    .exec()
    .then((files) => {
      res.send(files[0]);
    })
    .catch((er) => {
      console.log(err);
      res.status(500).send(error);
    });
});

router.delete("/:id", (req, res) => {
  // let fId = JSON.parse(req.params.id);
  const id = mongoose.Types.ObjectId(req.params.id);
  let query = { _id: id };
  const error = { message: "Error in deleting the file", error: "Bad Request" };
  const deleteFileFromDb = () => {
    File.deleteOne(query, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send(error);
      } else {
        res
          .status(204)
          .send({ message: "File deleted successfully", status: true });
      }
    });
  };
  File.findOne(query)
    .exec()
    .then((file) => {
      if (!file || file === undefined)
        res
          .status(500)
          .send({ status: "error", message: "Unable to find the file id" });
      else {
        deleteFileFromDb();
        res.status(200).send({ message: "Deleted Successfully!!!" });
      }
    });
});

module.exports = router;
