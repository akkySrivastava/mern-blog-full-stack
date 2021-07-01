import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import add from "./img/add.png";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./css/BlogCategory.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function BlogCategory() {
  const [showCategory, setShowCategory] = useState(false);

  const AddNewCategory = () => {
    return (
      <div className="show-category-container">
        <div
          className="form-container-top"
          onClick={() => setShowCategory(false)}
        >
          <ArrowBackIcon />
        </div>
        <div className="show-category-input">
          <label>Date</label>
          <input type="date" />
        </div>
        <div className="show-category-input">
          <label>Category name</label>
          <input type="text" placeholder="Add Category" />
        </div>
        <button>Add</button>
      </div>
    );
  };
  return (
    <div className="bg-category">
      {showCategory ? (
        <AddNewCategory />
      ) : (
        <>
          <div className="bg-category">
            <img onClick={() => setShowCategory(true)} src={add} alt="add" />
            {/* <span onClick={() => setShowCategory(true)}>+</span> */}
            <div className="bg-containerInfo">
              <div className="bg-container">
                <div className="bg-date">
                  <p>21-12-2021</p>
                </div>
                <div className="bg-name">
                  <p>Programming</p>
                </div>
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

export default BlogCategory;
