import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReactHTMLparser from "react-html-parser";
import axios from "axios";
import { Helmet } from "react-helmet";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ReactTimeAgo from "react-time-ago";

import "./index.css";
import BlogCard from "../Blogs/BlogCard";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

function SingleBlog() {
  const _history = useHistory();
  const [blogs, setBlogs] = useState([]);
  let { blogID } = useParams();
  let _blogID = String(blogID).split("_")[1];
  const [singleB, setSingleB] = useState([]);
  const [relBlog, setRelBlog] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.get("/api/blog", config).then((res) => setBlogs(res.data));
  }, []);

  console.log(blogs);

  //   console.log(blogCategory);
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (blogs) {
      const blogOBJ = blogs.filter(
        (singleb) =>
          String(singleb._id).slice(String(singleb._id).length - 5) === _blogID
      );
      if (blogOBJ.length > 0) {
        axios
          .get(`/api/file/${blogOBJ[0].author.authorImage}`, config)
          .then((res) => {
            blogOBJ[0].author.authorImageURL = res.data.filePath;
            setSingleB(blogOBJ[0]);
          });
      }
    }
  }, [blogs, _blogID]);
  console.log(singleB);

  useEffect(() => {
    if (blogs) {
      let relatedBlog = [];
      // console.log(result);
      // console.log(singleB);
      if (singleB?.blogCategory) {
        let bat = blogs.filter((relBlog) => {
          if (
            relBlog?.blogCategory[0]?.categoryName ===
              singleB?.blogCategory[0]?.categoryName &&
            singleB?._id !== relBlog?._id
          ) {
            relatedBlog.push(relBlog);
          }
        });
      }

      // console.log(relatedBlog);
      // let arr = relatedBlog.slice(-3);
      let arrBlog = [];
      for (let i = 0; i < 3; i++) {
        let arr = relatedBlog;
        let rand = relatedBlog[Math.floor(Math.random() * arr.length)];
        if (arrBlog.indexOf(rand) === -1) {
          arrBlog.push(rand);
        }
      }
      setRelBlog(arrBlog);
    }
  }, [singleB._id, blogs, singleB?.blogCategory]);

  console.log(relBlog);
  var d = relBlog[0]?.blogDate;
  var b = String(d).split(/\D/);
  var fdate = new Date(b[0], --b[1], b[2]);

  useEffect(() => {
    const src =
      "https://platform-api.sharethis.com/js/sharethis.js#property=5ebd50e96b62a000122bae90&product=inline-share-buttons";
    let script = document.querySelector(`script[src="${src}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      // Add script to document body
      document.body.appendChild(script);
    }
  });

  const handleBlogOpen = (title, id) => {
    // console.log(title, id);
    let _bTitle = String(title).toLowerCase().replace(/\s+/g, "-");

    let str = String(id);

    let _bid = str.slice(str.length - 5);

    _history.push(`/blog/${_bTitle + "_" + _bid}`);
    window.location.reload();
  };

  function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = "fixed";
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = "2em";
    textArea.style.height = "2em";

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = "transparent";

    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      // console.log("Copying text command was " + msg);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.log("Oops, unable to copy");
    }

    document.body.removeChild(textArea);
  }

  const RecommendBlog = ({ blog }) => {
    return (
      <>
        <div className="rblog">
          <div classname="rblog-container">
            <div className="rblog-image">
              <img src={blog?.image?.filePath} alt="" />
              <h4>{blog?.blogTitle}</h4>
              <p>{blog?.blogShortDescription}</p>
              <small>
                5 min read<span>Read Now</span>
              </small>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <meta name="description" content={singleB?.metaDescription} />
      </Helmet>
      <div className="singleBlog">
        <h1
          className="singleBlog__title"
          // style={{ fontFamily: " Lato, sans-serif" }}
        >
          {singleB.blogTitle}
        </h1>
        <img
          className="singleBlog__banner"
          alt=""
          src={singleB?.image?.filePath}
        ></img>
        <div className="singleBlog__body">
          {ReactHTMLparser(singleB.blogBody)}
        </div>
        <div className="copy">
          <div className="sharethis-inline-share-buttons singleBlog__share"></div>
          <div
            onClick={() => copyTextToClipboard(window.location.href)}
            className="copy-conatiner"
          >
            <FileCopyIcon />
            <p>Copy Link</p>
          </div>
        </div>

        <div className="also-read">
          <div className="also-read-container">
            <p>Recommended for you</p>
            <div className="also-read-blogs">
              {relBlog.map((_rlB) => (
                <>
                  {/* <h4
                    onClick={() => handleBlogOpen(_rlB?.blogTitle, _rlB?._id)}
                  >
                    {_rlB?.blogTitle}
                  </h4> */}
                  <div
                    onClick={() => handleBlogOpen(_rlB?.blogTitle, _rlB?._id)}
                    className="_single-blog"
                  >
                    <ReactTimeAgo date={fdate} locale="en-us" />
                    {window.innerWidth < 600 ? (
                      <>
                        <BlogCard isVertical={true} blog={_rlB} />
                      </>
                    ) : (
                      <>
                        <RecommendBlog blog={_rlB} />
                      </>
                    )}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>

        <div className="singleBlog__author">
          <div class="singleBlog__authorImage">
            <img src={singleB.author?.authorImageURL} alt="" />
          </div>
          <div class="singleBlog__author__data">
            <p
              style={{
                color: "#aaa",
              }}
            >
              Blog written by:{" "}
            </p>
            <p
              style={{
                textAlign: "left",
              }}
              class="singleBlog__author__name"
            >
              {" "}
              {singleB.author?.name}
            </p>
            <p class="singleBlog__author__about">
              {singleB.author?.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleBlog;
