import React, { useState } from "react";
import Add from "./img/add.png";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import "./css/Blog.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Blog() {
  const [blogForm, setBlogForm] = useState(false);

  const NewBlogForm = () => {
    return (
      <div className="form-container">
        <div className="form-container-top" onClick={() => setBlogForm(false)}>
          <ArrowBackIcon />
        </div>
        <div className="form-container-body">
          <div className="form-content">
            <div className="form-title">
              <p>Blog Title</p>
              <input placeholder="Blog title" />
            </div>
            <div className="form-title">
              <p>Blog Category</p>
              <select>
                <option value={1}>--select category--</option>
                <option value={1}>Programming</option>
              </select>
            </div>
            <div className="form-title">
              <p>Blog Author</p>
              <select>
                <option value={1}>--select author--</option>
                <option value={1}>Akash Kumar Verma</option>
              </select>
            </div>
            <div className="form-title">
              <p>Blog Date</p>
              <input type="date" />
            </div>
            <div className="form-title">
              <p>Blog Banner</p>
              <input type="file" />
            </div>
            <div className="form-title">
              <p>Blog Card Banner</p>
              <input type="file" />
            </div>
            <div className="form-title">
              <p>Short Description</p>
              <textarea placeholder="Enter short description"></textarea>
            </div>
            <div className="form-title">
              <p>Meta Description</p>
              <textarea placeholder="Enter meta description"></textarea>
            </div>
          </div>
          <div className="blog-main-content">
            <ReactQuill
              placeholder="Enter your content here"
              className="quill"
            />
          </div>
        </div>
        <button>Save Details</button>
      </div>
    );
  };

  return (
    <div className="blog-admin">
      {blogForm ? (
        <NewBlogForm />
      ) : (
        <>
          <div className="blog-admin-top">
            <div className="blog-admin-top-container">
              <img onClick={() => setBlogForm(true)} src={Add} alt="" />

              <div className="blog-admin-top-info">
                <div className="blog-admin-top-info-container">
                  <div className="blog-admin-top-info-content">
                    <div className="blogs-admin">
                      <div className="blog-admin-date">
                        <p>{"21 - 12 - 2020"}</p>
                      </div>
                      <div className="blog-admin-title">
                        <p>Why do we need to learn digital marketing?</p>
                      </div>
                      <div className="blog-admin-category">
                        <p>Digital Marketing</p>
                      </div>
                      <div className="blog-admin-short">
                        <p>
                          Digital Marketing helps to build a better relationship
                          with your customers/prospects. Better ROI (Return of
                          Investment). Has wide and dynamic career
                          opportunities.
                        </p>
                      </div>
                    </div>
                    <div className="blog-admin-control">
                      <IconButton className="edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton className="delete">
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
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
