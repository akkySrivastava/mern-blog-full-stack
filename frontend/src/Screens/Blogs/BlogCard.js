import React from "react";
import { useHistory } from "react-router-dom";
import "./BlogCard.css";
import { Helmet } from "react-helmet";

function BlogCard({ isVertical, blog }) {
  const _history = useHistory();
  // console.log(blog);

  let _bTitle = String(blog?.blogTitle).toLowerCase().replace(/\s+/g, "-");

  let str = String(blog?._id);

  let _bid = str.slice(str.length - 5);

  return (
    <>
      <Helmet>
        <meta name="description" content={blog?.metaDescription} />
      </Helmet>
      {isVertical ? (
        <div
          className="blogCard blogCard__vertical"
          onClick={() => _history.push(`/blog/${_bTitle + "_" + _bid}`)}
        >
          <img
            alt=""
            className="blogCard__image"
            src={blog?.cardImage?.filePath}
          ></img>
          <div className="blogCard__body">
            <h3 className="blogCard__title">{blog?.blogTitle}</h3>
            <hr className="blogCard__divider" />

            <p className="blogCard__desc">{blog?.blogShortDescription}</p>
            <span className="blogCard__info">
              <p>By {blog?.author?.name}</p>
              <p>{blog?.blogDate}</p>
            </span>
          </div>
        </div>
      ) : (
        <div className="blogCard blogCard__horizontal">
          <img
            className="blogCard__image"
            src={blog?.cardImage?.filePath}
            alt=""
          ></img>
          <div className="blogCard__body">
            <h3 className="blogCard__title">{blog?.blogTitle}</h3>
            <hr className="blogCard__divider" />

            <p className="blogCard__desc">{blog?.blogShortDescription}</p>
            <button
              className="blogCard__button"
              onClick={() => _history.push(`/blog/${_bTitle + "_" + _bid}`)}
            >
              Read more
            </button>
            <span className="blogCard__info">
              <p>By {blog?.author?.name}</p>
              <p>{blog?.blogDate}</p>
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogCard;
