const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const File = require("../models/File");

router.post("/", async (req, res) => {
  if (req.body.blogBanner) {
    req.body.blogBanner = mongoose.Types.ObjectId(req.body.blogBanner);
  }
  if (req.body.blogCardBanner) {
    req.body.blogCardBanner = mongoose.Types.ObjectId(req.body.blogCardBanner);
  }
  const {
    blogTitle,
    blogCategory,
    blogShortDescription,
    metaDescription,
    blogDate,
    blogBody,
    blogAuthor,
    blogBanner,
    blogCardBanner,
  } = req.body;

  const newBlog = new Blog({
    blogTitle,
    blogCategory,
    blogShortDescription,
    metaDescription,
    blogDate,
    blogBody,
    blogAuthor,
    blogBanner,
    blogCardBanner,
  });
  newBlog
    .save()
    .then((doc) => {
      res.status(200).send({ message: "blog added successfuly!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "blog not added" });
    });
});

router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving blogs",
    error: "Bad Request",
  };
  Blog.aggregate([
    {
      $lookup: {
        from: "files",
        let: { blogBanner: "$blogBanner" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$blogBanner"],
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
      $lookup: {
        from: "files",
        let: { blogCardBanner: "$blogCardBanner" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$blogCardBanner"],
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
        as: "cardImage",
      },
    },
    {
      $unwind: {
        path: "$cardImage",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "blogauthors",
        let: { blogAuthor: "$blogAuthor" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$blogAuthor"],
              },
            },
          },
          {
            $project: {
              name: 1,
              _id: 1,
              authorImage: 1,
              description: 1,
            },
          },
        ],
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "blogcategories",
        let: { blogCategory: "$blogCategory" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$blogCategory"],
              },
            },
          },
          {
            $project: {
              name: 1,
              _id: 1,
            },
          },
        ],
        as: "category",
      },
    },
    {
      $unwind: {
        path: "$category",
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
    .then((blog) => {
      res.status(200).send(blog);
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
  const blog = await Blog.findOne({ _id: bid });
  try {
    if (blog) {
      res.status(201).send({ blog });
    } else {
      res.status(404).send({ error: "blog not found" });
    }
  } catch (e) {
    res.status(404).send({ message: "error", error: e });
  }
});

router.put("/:bid", async (req, res) => {
  try {
    Blog.findByIdAndUpdate({ _id: req.params.bid }, req.body).then((doc) =>
      res.status(200).send("Blog updated")
    );
  } catch (e) {
    console.log(e);
    res.status(400).send("Error");
  }
});

router.delete("/:bid", async (req, res) => {
  try {
    Blog.findByIdAndDelete({ _id: req.params.bid }).then((doc) =>
      res.status(200).send("Blog deleted")
    );
  } catch (e) {
    console.log(e);
    res.status(400).send("Error");
  }
});

module.exports = router;
