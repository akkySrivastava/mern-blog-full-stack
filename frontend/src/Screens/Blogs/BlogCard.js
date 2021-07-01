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
            src="https://document-export.canva.com/gfWiI/DAEUregfWiI/99/thumbnail/-jNCT6i61JfpsCt6j_h9mw-0001-16417868815.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWDTJW6UD%2F20210701%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210701T114550Z&X-Amz-Expires=29226&X-Amz-Signature=4a77185b8e8b3655522e7ce41b9f32bcb93758de6f597e8431ca86e20445a978&X-Amz-SignedHeaders=host&response-expires=Thu%2C%2001%20Jul%202021%2019%3A52%3A56%20GMT"
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
            src="https://document-export.canva.com/gfWiI/DAEUregfWiI/99/thumbnail/-jNCT6i61JfpsCt6j_h9mw-0001-16417868815.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWDTJW6UD%2F20210701%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210701T114550Z&X-Amz-Expires=29226&X-Amz-Signature=4a77185b8e8b3655522e7ce41b9f32bcb93758de6f597e8431ca86e20445a978&X-Amz-SignedHeaders=host&response-expires=Thu%2C%2001%20Jul%202021%2019%3A52%3A56%20GMT"
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
