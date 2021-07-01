import React, { useState } from "react";
// import Blog from "./img/blog.png";
// import Category from "./img/category.png";
// import Author from "./img/author.png";
import Blogs from "./Blog";

import "./css/index.css";
import BlogAuthor from "./BlogAuthor";
import BlogCategory from "./BlogCategory";

function Index() {
  const [showMenu, setShowMenu] = useState("blog");
  const [showBlog, setShowBlog] = useState(true);
  const [showAuthor, setShowAuthor] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

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
          {showBlog && <Blogs />}
          {showAuthor && <BlogAuthor />}
          {showCategory && <BlogCategory />}
        </div>
      </div>
    </div>
  );
}

export default Index;
