const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const BlogAuthor = require("../models/BlogAuthor");
const File = require("../models/File");

router.post("/", async (req, res) => {
  if (req.body.authorImage) {
    req.body.authorImage = mongoose.Types.ObjectId(req.body.authorImage);
  }
  const { name, date, description, authorImage } = req.body;

  const newBlogAuthor = new BlogAuthor({
    name,

    description,
    date,
    authorImage,
  });
  newBlogAuthor
    .save()
    .then((doc) => {
      res.status(200).send({ message: "blog author added successfuly!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "blog author not added" });
    });
});

router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving blogs",
    error: "Bad Request",
  };
  BlogAuthor.aggregate([
    {
      $lookup: {
        from: "files",
        let: { authorImage: "$authorImage" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$authorImage"],
              },
            },
          },
          {
            $project: {
              filePath: 1,
              _id: 1,
              originalName: 1,
            },
          },
        ],
        as: "image",
      },
    },
    {
      $unwind: {
        path: "$image",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        __v: 0,
      },
    },
  ])
    .exec()
    .then((blogauthor) => {
      res.status(200).send(blogauthor);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
  //   const blog = await Blog.find({});
  //   try {
  //     if (blog) {
  //       const allBlogs = await Promise.all(
  //         blog.map(async (singleBlog) => {
  //           var singleBlogOBJ = await File.find({ _id: singleBlog.blogBanner });
  //           return { ...singleBlog, bannerURL: singleBlogOBJ[0].filePath };
  //         })
  //       );
  //       res.status(201).send({ allBlogs });
  //     } else {
  //       res.status(404).send({ error: "blogs found" });
  //     }
  //   } catch (e) {
  //     res.status(404).send({ message: "error", error: e });
  //   }
});

router.get("/:bid", async (req, res) => {
  const bid = req.params.bid;
  const blog = await BlogAuthor.findOne({ _id: bid });
  try {
    if (blog) {
      res.status(201).send({ blog });
    } else {
      res.status(404).send({ error: "blogAuther not found" });
    }
  } catch (e) {
    res.status(404).send({ message: "error", error: e });
  }
});

router.put("/:bid", async (req, res) => {
  try {
    BlogAuthor.findByIdAndUpdate({ _id: req.params.bid }, req.body).then(
      (doc) => res.status(200).send("Blog Author updated")
    );
  } catch (e) {
    console.log(e);
    res.status(400).send("Error");
  }
});

router.delete("/:bid", async (req, res) => {
  let bAuthor;
  try {
    bAuthor = await BlogAuthor.findById({ _id: req.params.bid })
      .deleteOne()
      .then((doc) => res.status(200).send("Author Deleted Successfully"));
  } catch (e) {
    console.log(e);
    res.status(400).send("Error");
  }
});

module.exports = router;
