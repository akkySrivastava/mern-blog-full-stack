import React, { useEffect, useState } from "react";
// import Blog from "./img/blog.png";
// import Category from "./img/category.png";
// import Author from "./img/author.png";
import Blogs from "./Blog";

import "./css/index.css";
import BlogAuthor from "./BlogAuthor";
import BlogCategory from "./BlogCategory";
import axios from "axios";

function Index() {
  const [showMenu, setShowMenu] = useState("blog");
  const [showBlog, setShowBlog] = useState(true);
  const [showAuthor, setShowAuthor] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [allBlogCategory, setAllBlogCategory] = useState([]);
  const [allBlogAuthor, setAllBlogAuthor] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.get("/api/blog", config).then((res) => setAllBlogs(res.data));
    axios
      .get("/api/blogauthor", config)
      .then((res) => setAllBlogAuthor(res.data));
    axios
      .get("/api/blogcategory", config)
      .then((res) => setAllBlogCategory(res.data));
  }, []);

  console.log(allBlogs);
  console.log(allBlogAuthor);

  const getUpdatedAuthor = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get("/api/blogauthor", config)
      .then((res) => setAllBlogAuthor(res.data));
  };
  const getUpdatedCategory = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get("/api/blogcategory", config)
      .then((res) => setAllBlogCategory(res.data));
  };

  const changeMenu = (showMenu) => {
    setShowMenu(showMenu);

    switch (showMenu) {
      case "blog": {
        setShowBlog(true);
        setShowAuthor(false);
        setShowCategory(false);
        break;
      }
      case "author": {
        setShowBlog(false);
        setShowAuthor(true);
        setShowCategory(false);
        break;
      }
      case "category": {
        setShowBlog(false);
        setShowAuthor(false);
        setShowCategory(true);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="index">
      <div className="index-left">
        <div className="index-left-container">
          <div className="index-left-menus">
            <div onClick={() => changeMenu("blog")} className="index-left-menu">
              {/* <img src={Blog} alt="blogs" /> */}
              <p>Blogs</p>
            </div>
            <div
              onClick={() => changeMenu("author")}
              className="index-left-menu"
            >
              {/* <img src={Author} alt="authors" /> */}
              <p>Author</p>
            </div>
            <div
              onClick={() => changeMenu("category")}
              className="index-left-menu"
            >
              {/* <img src={Category} alt="categories" /> */}
              <p>Category</p>
            </div>
          </div>
        </div>
      </div>
      <div className="index-right">
        <div className="index-right-container">
          {showBlog && (
            <Blogs
              allBlogs={allBlogs}
              allBlogAuthor={allBlogAuthor}
              allBlogCategory={allBlogCategory}
            />
          )}
          {showAuthor && (
            <BlogAuthor
              allBlogAuthor={allBlogAuthor}
              getUpdatedAuthors={getUpdatedAuthor}
            />
          )}
          {showCategory && (
            <BlogCategory
              allBlogCategory={allBlogCategory}
              getUpdatedCategory={getUpdatedCategory}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
