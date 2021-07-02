import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import add from "./img/add.png";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./css/BlogCategory.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";
import creds from "../../SecretKey.json";

function BlogCategory({ getUpdatedCategory, allBlogCategory }) {
  const [showCategory, setShowCategory] = useState(false);
  const [updateBlogCategory, setupdateBlogCategory] = useState(false);
  const [tobeEditedBlogCategory, settobeEditedBlogCategory] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  console.log(allBlogCategory);

  const editBlogCategory = (blogCategory) => {
    settobeEditedBlogCategory(blogCategory);
    setupdateBlogCategory(true);
    setShowEditForm(true);
    setName(blogCategory.name);
    setDate(blogCategory.date);
  };

  const addNewBlogCategory = () => {
    settobeEditedBlogCategory({});
    setupdateBlogCategory(false);
    setShowEditForm(true);
    setShowCategory(true);
    setName("");
    setDate("");
  };

  const goBack = () => {
    setupdateBlogCategory(false);
    settobeEditedBlogCategory({});
    setShowEditForm(false);
    setShowCategory(false);
    setName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (updateBlogCategory) {
      //update
      const body = {
        name,
        date,
      };

      if (date && name !== "") {
        axios
          .put(`/api/blogcategory/${tobeEditedBlogCategory._id}`, body, config)
          .then((res) => getUpdatedCategory());
        alert("updated successfully");
        goBack();
      }
    } else {
      //new
      if (date && name !== "") {
        const body = {
          name,
          date,
        };

        axios.post("/api/blogcategory", body, config).then((res) => {
          console.log(res);
          getUpdatedCategory();
          alert("Added Successfully");
          goBack();
        });
      }
    }
  };

  const deleteBlogCategory = (blogCategory) => {
    if (
      window.prompt("Enter secret key") ===
      (`${process.env.SECRET_KEY_ADMIN}` || creds.SECRET_KEY_ADMIN)
    ) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (window.confirm("Are you sure to delete this category")) {
        axios
          .delete(`/api/blogcategory/${blogCategory._id}`, config)
          .then((res) => {
            console.log(res.data);

            getUpdatedCategory();
            alert("Deleted Successfully !!");
            goBack();
            return res.data;
          })
          .catch((err) => console.log(err));
      }
    } else {
      alert("You are not allowed!!! Contact Admin");
    }
  };

  return (
    <div className="bg-category">
      {showEditForm ? (
        <div className="show-category-container">
          <div className="form-container-top" onClick={() => goBack()}>
            <ArrowBackIcon />
          </div>
          <div className="show-category-input">
            <label>Date</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
          <div className="show-category-input">
            <label>Category name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Add Category"
            />
          </div>
          <button onClick={handleSubmit}>
            {showCategory ? "Add" : "Save"}
          </button>
        </div>
      ) : (
        <>
          <div className="bg-category">
            <img onClick={addNewBlogCategory} src={add} alt="add" />
            {/* <span onClick={() => setShowCategory(true)}>+</span> */}
            {allBlogCategory.map((_bc) => (
              <>
                <div className="bg-containerInfo">
                  <div className="bg-container">
                    <div className="bg-date">
                      <p>{_bc.date}</p>
                    </div>
                    <div className="bg-name">
                      <p>{_bc.name}</p>
                    </div>
                  </div>
                  <div className="button-control">
                    <IconButton
                      onClick={() => editBlogCategory(_bc)}
                      className="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteBlogCategory(_bc)}
                      className="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BlogCategory;
