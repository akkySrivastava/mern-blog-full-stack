const express = require("express");
const router = express.Router();
const blogRouter = require("./Blog");
// const fileRouter = require("./File");
const blogAuthorRouter = require("./BlogAuther");
const blogCategoryRouter = require("./BlogCategory");
router.get("/", (req, res) => {
  res.send("Welcome to MERN-BLOG");
});

// router.use("/file", fileRouter);
router.use("/blog", blogRouter);
router.use("/blogauthor", blogAuthorRouter);
router.use("/blogcategory", blogCategoryRouter);

module.exports = router;
