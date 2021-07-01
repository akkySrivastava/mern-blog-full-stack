import { Avatar, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import add from "./img/add.png";
import "./css/BlogAuthor.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function BlogAuthor() {
  const [showAuthor, setShowAuthor] = useState(false);

  const AddAuthor = () => {
    return (
      <div className="new-author-container">
        <div
          className="form-container-top"
          onClick={() => setShowAuthor(false)}
        >
          <ArrowBackIcon />
        </div>
        <div className="new-author-input">
          <label>Date</label>
          <input type="date" />
        </div>
        <div className="new-author-input">
          <label>Author Name</label>
          <input placeholder="Enter name" />
        </div>
        <div className="new-author-input">
          <label>Short Bio</label>
          <textarea placeholder="About yourself"></textarea>
        </div>
        <div className="new-author-input">
          <label>Profile Image</label>
          <input type="file" />
        </div>
        <button>Save Details</button>
      </div>
    );
  };
  return (
    <div className="blog-author">
      {showAuthor ? (
        <>
          <AddAuthor />
        </>
      ) : (
        <>
          <div className="blog-author-container">
            <img onClick={() => setShowAuthor(true)} src={add} alt="add" />
            {/* <span onClick={() => setShowAuthor(true)}>+</span> */}
            <div className="blog-author-content">
              <div className="blog-author-info">
                <div className="author-date">
                  <p>21-12-2021</p>
                </div>
                <div className="author-name">
                  <p>Akash Kumar Verma</p>
                </div>
                <div className="author-desc">
                  <p>I'm a content writer </p>
                </div>

                <Avatar src="" />
              </div>
              <div className="button-control">
                <IconButton className="edit">
                  <EditIcon />
                </IconButton>
                <IconButton className="delete">
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BlogAuthor;
