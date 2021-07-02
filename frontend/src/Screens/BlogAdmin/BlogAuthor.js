import { Avatar, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import add from "./img/add.png";
import "./css/BlogAuthor.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import creds from "../../SecretKey.json";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function BlogAuthor({ allBlogAuthor, getUpdatedAuthors }) {
  const [showAuthor, setShowAuthor] = useState(false);
  const [updateBlogAuthor, setupdateBlogAuthor] = useState(false);
  const [tobeEditedBlogAuthor, settobeEditedBlogAuthor] = useState(false);
  const [showEditForm, setshowEditForm] = useState(false);

  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [authorImage, setAuthorImage] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBlogAuthorUpload = (e) => {
    if (e.target.files[0]) {
      setAuthorImage(e.target.files[0]);
    }
  };

  const editBlogAuthor = (blogAuthor) => {
    settobeEditedBlogAuthor(blogAuthor);
    setupdateBlogAuthor(true);
    setshowEditForm(true);
    setName(blogAuthor.name);
    setDescription(blogAuthor.description);
    setDate(blogAuthor.date);
  };

  const addNewBlogAuthor = () => {
    settobeEditedBlogAuthor({});
    setupdateBlogAuthor(false);
    setshowEditForm(true);
    setShowAuthor(true);
    setName("");
    setDescription("");
    setDate("");
  };

  const goBack = () => {
    setupdateBlogAuthor(false);
    settobeEditedBlogAuthor({});
    setshowEditForm(false);
    setShowAuthor(false);
    setName("");
    setDescription("");
    setDate("");
  };

  const submitData = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (updateBlogAuthor) {
      //   update
      if (authorImage === null) {
        // dont update image
        const body = {
          name,
          date,
          description,
        };
        await axios
          .put(`/api/blogauthor/${tobeEditedBlogAuthor._id}`, body, config)
          .then((res) => {
            console.log(res);
            getUpdatedAuthors();
            setLoading(false);
            alert("Updated successfully !!");
            goBack();
          });
      } else {
        // update image

        const body = {
          name,
          date,
          description,
        };

        if (authorImage !== null) {
          console.log("update author image");

          await axios
            .delete(`/api/file/${tobeEditedBlogAuthor.image?._id}`, config)
            .then((res) => {
              console.log(res.data);
              return res.data;
            })
            .catch((err) => console.log(err));
        }

        const formData = new FormData();
        formData.append("files", authorImage);
        const fileID = await axios
          .post("/api/file", formData, config)
          .then((res) => res.data.fileId)
          .catch((error) => console.log(error));

        body.authorImage = fileID;

        axios
          .put(`/api/blogauthor/${tobeEditedBlogAuthor._id}`, body, config)
          .then((res) => {
            console.log(res);
            setLoading(false);
            getUpdatedAuthors();
            alert("Updated successfully !!");
            goBack();
          });
      }
    } else {
      //   new
      const formData = new FormData();
      formData.append("files", authorImage);
      const fileID = await axios
        .post("/api/file", formData, config)
        .then((res) => res.data.fileId)
        .catch((error) => ({ message: "Error" }));

      const body = {
        name,
        date,
        description,
        authorImage: fileID,
      };

      axios.post("/api/blogauthor", body, config).then((res) => {
        console.log(res);
        getUpdatedAuthors();
        setLoading(false);
        alert("Added Successfully !!");
        goBack();
      });
    }
  };

  const deleteBlogAuthor = async (blogAuthor) => {
    if (
      window.prompt("Enter secret key") ===
      (`${process.env.SECRET_KEY_ADMIN}` || creds.SECRET_KEY_ADMIN)
    ) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (window.confirm("Are you sure to delete this author")) {
        await axios
          .delete(`/api/blogauthor/${blogAuthor._id}`, config)
          .then((res) => {
            console.log(res.data);

            alert("Deleted Successfully !!");
            getUpdatedAuthors();
            goBack();
            return res.data;
          })
          .catch((err) => console.log(err));
      }
    } else {
      alert("You are not allowed!!! Contact Admin");
    }
  };
  const classes = useStyles();
  return (
    <div className="blog-author">
      {showEditForm ? (
        <>
          {loading && <LinearProgress className={classes.root} />}
          <div className="new-author-container">
            <div className="form-container-top" onClick={() => goBack()}>
              <ArrowBackIcon />
            </div>
            <div className="new-author-input">
              <label>Date</label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
              />
            </div>
            <div className="new-author-input">
              <label>Author Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div className="new-author-input">
              <label>Short Bio</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="About yourself"
              ></textarea>
            </div>
            <div className="new-author-input">
              <label>Profile Image</label>
              <input onChange={handleBlogAuthorUpload} type="file" />
            </div>
            <button onClick={submitData}>{showAuthor ? "Add" : "Save"}</button>
          </div>
        </>
      ) : (
        <>
          <div className="blog-author-container">
            <img onClick={addNewBlogAuthor} src={add} alt="add" />
            {/* <span onClick={() => setShowAuthor(true)}>+</span> */}
            {allBlogAuthor.map((_ba) => (
              <div className="blog-author-content">
                <div className="blog-author-info">
                  <div className="author-date">
                    <p>{_ba.date}</p>
                  </div>
                  <div className="author-name">
                    <p>{_ba.name}</p>
                  </div>
                  <div className="author-desc">
                    <p>{_ba.description}</p>
                  </div>

                  <Avatar src={_ba?.image?.filePath} />
                </div>
                <div className="button-control">
                  <IconButton
                    onClick={() => editBlogAuthor(_ba)}
                    className="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteBlogAuthor(_ba)}
                    className="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BlogAuthor;
