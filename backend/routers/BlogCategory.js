const express = require("express");
const router = express.Router();
const BlogCategory = require("../models/BlogCategory");

router.post("/", async (req, res) => {
  const { name, date } = req.body;
  const newBlogCategory = new BlogCategory({
    name,
    date,
  });
  newBlogCategory
    .save()
    .then((doc) => {
      res.status(200).send({ message: "blog category added successfuly!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ error: "blog category not added" });
    });
});

router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving blogs",
    error: "Bad Request",
  };
  BlogCategory.find({})
    .exec()
    .then((blogcategory) => {
      res.status(200).send(blogcategory);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(400).send(error);
    });
});

// router.get("/:bid", async (req, res) => {
//   const bid = req.params.bid;
//   const blog = await Blog.findOne({ _id: bid });
//   try {
//     if (blog) {
//       res.status(201).send({ blog });
//     } else {
//       res.status(404).send({ error: "blog not found" });
//     }
//   } catch (e) {
//     res.status(404).send({ message: "error", error: e });
//   }
// });

router.put("/:cid", async (req, res) => {
  try {
    BlogCategory.findByIdAndUpdate({ _id: req.params.cid }, req.body).then(
      (doc) => res.status(200).send("Blog updated")
    );
  } catch (e) {
    console.log(e);
    res.status(400).send("Error");
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    BlogCategory.findByIdAndDelete({ _id: req.params.cid }).then((doc) =>
      res.status(200).send({ message: "Category Deleted" })
    );
  } catch (e) {
    console.log(e);
    res.status(400).send("Error");
  }
});
module.exports = router;
