import React, { useEffect, useState } from "react";
import Add from "./img/add.png";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import "./css/Blog.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

function Blog({ allBlogs, allBlogAuthor, allBlogCategory }) {
  const [allBlog, setAllBlogs] = useState([]);
  useEffect(() => {
    setAllBlogs(allBlogs);
  }, [allBlogs]);
  const [updateBlog, setupdateBlog] = useState(false);
  const [tobeEditedBlog, settobeEditedBlog] = useState({});
  const [showEditForm, setshowEditForm] = useState(false);
  const [blogForm, setBlogForm] = useState(false);

  const [blogTitle, setblogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState([{ categoryName: "" }]);
  const [blogShortDescription, setblogShortDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [blogDate, setblogDate] = useState("");
  const [blogAuthor, setblogAuthor] = useState("");
  const [blogBanner, setblogBanner] = useState(null);
  const [blogCardBanner, setblogCardBanner] = useState(null);
  const [blogBody, setBlogBody] = useState("");

  const editBlog = (blog) => {
    settobeEditedBlog(blog);
    setupdateBlog(true);
    setshowEditForm(true);
    setBlogForm(false);
    setBlogBody(blog.blogBody);
    setblogTitle(blog.blogTitle);
    setBlogCategory(blog.blogCategory);
    setblogShortDescription(blog.blogShortDescription);
    setMetaDescription(blog.metaDescription);
    setblogDate(blog.blogDate);
    setblogAuthor(blog.blogAuthor);
  };

  const addNewBlog = () => {
    settobeEditedBlog({});
    setupdateBlog(false);
    setshowEditForm(true);
    setBlogForm(true);
    setBlogBody("");
    setblogTitle("");
    setBlogCategory([]);
    setblogShortDescription("");
    setMetaDescription("");
    setblogDate("");
    setblogAuthor("");
  };

  const goBack = () => {
    setupdateBlog(false);
    settobeEditedBlog({});
    setshowEditForm(false);
    setBlogForm(false);
    setBlogBody("");
    setblogTitle("");
    setBlogCategory([]);
    setblogShortDescription("");
    setMetaDescription("");
    setblogDate("");
    setblogAuthor("");
  };

  const handleChange = (value) => {
    setBlogBody(value);
  };

  const handleBannerUpload = (e) => {
    if (e.target.files[0]) {
      setblogBanner(e.target.files[0]);
    }
  };

  const handleCardBannerUpload = (e) => {
    if (e.target.files[0]) {
      setblogCardBanner(e.target.files[0]);
    }
  };

  const deleteBlog = async (blog) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // delete file

    // delete blog
    if (window.confirm("Are you sure to delete this blog?")) {
      await axios
        .delete(`/api/blog/${blog._id}`, config)
        .then((res) => {
          console.log(res.data);
          alert("Deleted Successfully !!");
          return res.data;
        })
        .catch((err) => console.log(err));
    }

    // await axios
    //   .delete(`/api/file/${blog.image?._id}`, config)
    //   .then((res) => {
    //     console.log(res.data);
    //     return res.data;
    //   })
    //   .catch((err) => console.log(err));
    // await axios
    //   .delete(`/api/file/${blog.cardImage?._id}`, config)
    //   .then((res) => {
    //     console.log(res.data);
    //     return res.data;
    //   })
    //   .catch((err) => console.log(err));
  };

  const submitData = async () => {
    const userInfo = localStorage.getItem("userInfo");
    const token = userInfo ? JSON.parse(userInfo).token : "";
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    if (updateBlog) {
      //   update
      if (blogBanner === null && blogCardBanner === null) {
        // dont update image
        const body = {
          blogTitle,
          blogCategory,
          blogShortDescription,
          metaDescription,
          blogDate,
          blogBody,
          blogAuthor,
        };

        axios
          .put(`/api/blog/${tobeEditedBlog._id}`, body, config)
          .then((res) => {
            console.log(res);
            var newAllBlogs = [...allBlogs];
            for (var i in newAllBlogs) {
              if (newAllBlogs[i]._id == tobeEditedBlog._id) {
                newAllBlogs[i] = tobeEditedBlog;
                break;
              }
            }
            setAllBlogs(newAllBlogs);
            goBack();
          });
      } else {
        // update image

        const body = {
          blogTitle,
          blogCategory,
          blogShortDescription,
          metaDescription,
          blogDate,
          blogBody,
          blogAuthor,
        };

        console.log(tobeEditedBlog);

        // if (blogBanner !== null) {
        //   console.log("update blog banner");
        //   await axios
        //     .delete(`/api/file/${tobeEditedBlog.image?._id}`, config)
        //     .then((res) => {
        //       console.log(res.data);
        //       return res.data;
        //     })
        //     .catch((err) => console.log(err));

        //   const formData = new FormData();
        //   formData.append("files", blogBanner);
        //   const fileID = await axios
        //     .post("/api/file", formData, config)
        //     .then((res) => res.data.fileId)
        //     .catch((error) => console.log(error));

        //   body.blogBanner = fileID;
        // }

        // if (blogCardBanner !== null) {
        //   console.log("update blog  card banner");
        //   await axios
        //     .delete(`/api/file/${tobeEditedBlog.cardImage?._id}`, config)
        //     .then((res) => {
        //       console.log(res.data);
        //       return res.data;
        //     })
        //     .catch((err) => console.log(err));

        //   const _formData = new FormData();
        //   _formData.append("files", blogCardBanner);
        //   const fileIDCard = await axios
        //     .post("/api/file", _formData, config)
        //     .then((res) => res.data.fileId)
        //     .catch((error) => console.log(error));

        //   body.blogCardBanner = fileIDCard;
        // }

        axios
          .put(`/api/blog/${tobeEditedBlog._id}`, body, config)
          .then((res) => {
            console.log(res);
            var newAllBlogs = [...allBlogs];
            for (var i in newAllBlogs) {
              if (newAllBlogs[i]._id == tobeEditedBlog._id) {
                newAllBlogs[i] = tobeEditedBlog;
                break;
              }
            }
            setAllBlogs(newAllBlogs);
            alert("Updated Successfully!!");
            goBack();
          });
      }
      alert("Updated Successfully!!");
    } else {
      //   new
      // const formData = new FormData();
      // formData.append("files", blogBanner);
      // const fileID = await axios
      //   .post("/api/file", formData, config)
      //   .then((res) => res.data.fileId)
      //   .catch((error) => console.log(error));

      // const _formData = new FormData();
      // _formData.append("files", blogCardBanner);
      // const fileIDCard = await axios
      //   .post("/api/file", _formData, config)
      //   .then((res) => res.data.fileId)
      //   .catch((error) => console.log(error));

      const body = {
        blogTitle,
        blogCategory,
        blogShortDescription,
        metaDescription,
        blogDate,
        blogBody,
        blogAuthor,
        // blogBanner: fileID,
        // blogCardBanner: fileIDCard,
      };

      axios.post("/api/blog", body, config).then((res) => {
        console.log(res);
        alert("Added Successfully !!");
        goBack();
      });
      alert("Added Successfully !!");
    }
  };

  const handleblogCategoryChange = (e) => {
    let _blogCategoryArray = [...blogCategory];
    let singleBlogCatOBJ = {
      categoryName: e.target.value,
    };
    if (
      _blogCategoryArray.filter((bcat) => bcat.categoryName === e.target.value)
        .length === 0
    ) {
      _blogCategoryArray.push(singleBlogCatOBJ);
    }
    setBlogCategory(_blogCategoryArray);
  };

  const removeCategory = (cat) => {
    var _blogCategoryArray = [...blogCategory];

    const index = _blogCategoryArray.indexOf(cat);
    _blogCategoryArray.splice(index, 1);
    setBlogCategory(_blogCategoryArray);
  };

  return (
    <div className="blog-admin">
      {showEditForm ? (
        <div className="form-container">
          <div className="form-container-top" onClick={goBack}>
            <ArrowBackIcon />
          </div>
          <div className="form-container-body">
            <div className="form-content">
              <div className="form-title">
                <p>Blog Title</p>
                <input
                  value={blogTitle}
                  onChange={(e) => setblogTitle(e.target.value)}
                  placeholder="Blog title"
                />
              </div>
              <div className="form-title">
                <p>Blog Category</p>
                <select onChange={(e) => handleblogCategoryChange(e)}>
                  <option value={1}>--select category--</option>
                  {allBlogCategory.map((_bc) => {
                    return <option value={_bc?._id}>{_bc?.name}</option>;
                  })}
                </select>
              </div>
              <div className="blogAdmin__categoryTabs">
                {blogCategory?.map((blogCat) => {
                  return (
                    <div className="blogAdmin__category__tab">
                      <p>
                        {
                          allBlogCategory.filter(
                            (bcat) => bcat._id === blogCat.categoryName
                          )[0].name
                        }
                      </p>
                      <div
                        className="blogAdmin__category__tabRemove"
                        onClick={() => removeCategory(blogCat)}
                      >
                        x
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="form-title">
                <p>Blog Author</p>
                <select
                  value={blogAuthor}
                  onChange={(e) => setblogAuthor(e.target.value)}
                >
                  <option value={1}>--select author--</option>
                  {allBlogAuthor.map((_ba) => {
                    return <option value={_ba._id}>{_ba.name}</option>;
                  })}
                </select>
              </div>
              <div className="form-title">
                <p>Blog Date</p>
                <input
                  value={blogDate}
                  onChange={(e) => setblogDate(e.target.value)}
                  type="date"
                />
              </div>
              <div className="form-title">
                <p>Blog Banner</p>
                <input onChange={handleBannerUpload} type="file" />
              </div>
              <div className="form-title">
                <p>Blog Card Banner</p>
                <input onChange={handleCardBannerUpload} type="file" />
              </div>
              <div className="form-title">
                <p>Short Description</p>
                <textarea
                  value={blogShortDescription}
                  onChange={(e) => setblogShortDescription(e.target.value)}
                  placeholder="Enter short description"
                ></textarea>
              </div>
              <div className="form-title">
                <p>Meta Description</p>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Enter meta description"
                ></textarea>
              </div>
            </div>
            <div className="blog-main-content">
              <ReactQuill
                value={blogBody}
                onChange={handleChange}
                placeholder="Enter your content here"
                className="quill"
              />
            </div>
          </div>
          <button onClick={submitData}>{blogForm ? "Add" : "Save"}</button>
        </div>
      ) : (
        <>
          <div className="blog-admin-top">
            <div className="blog-admin-top-container">
              <img onClick={addNewBlog} src={Add} alt="" />

              <div className="blog-admin-top-info">
                <div className="blog-admin-top-info-container">
                  {allBlog.map((_singleBlog) => (
                    <div className="blog-admin-top-info-content">
                      <div className="blogs-admin">
                        <div className="blog-admin-date">
                          <p>{_singleBlog.blogDate}</p>
                        </div>
                        <div className="blog-admin-title">
                          <p>{_singleBlog.blogTitle}</p>
                        </div>
                        <div className="blog-admin-category">
                          <p>
                            {_singleBlog.blogCategory?.map((bcat) => {
                              return (
                                allBlogCategory?.filter(
                                  (allbCat) => allbCat._id === bcat.categoryName
                                )[0]?.name + ","
                              );
                            })}
                          </p>
                        </div>
                        <div className="blog-admin-short">
                          <p>{_singleBlog.blogShortDescription}</p>
                        </div>
                      </div>
                      <div className="blog-admin-control">
                        <IconButton
                          onClick={() => editBlog(_singleBlog)}
                          className="edit"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteBlog(_singleBlog)}
                          className="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Blog;
