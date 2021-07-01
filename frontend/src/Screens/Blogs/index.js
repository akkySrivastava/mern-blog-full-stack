import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import BlogCard from "./BlogCard";
import "./index.css";

function Index() {
  const [temparray, settemparray] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [desktopView, setDesktopView] = useState(false);
  const [selectedCategory, setselectedCategory] = useState(
    localStorage.getItem("category") === null
      ? "Programming"
      : localStorage.getItem("category")
  );

  const [allBlogCategory, setAllBlogCategory] = useState([]);
  const [allBlogs, setallBlogs] = useState([]);
  useEffect(() => {
    localStorage.setItem("category", selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.get("/api/blog", config).then((res) => setallBlogs(res.data));

    axios
      .get("/api/blogcategory", config)
      .then((res) => setAllBlogCategory(res.data));
  }, []);

  console.log(allBlogs);

  useEffect(() => {
    if (allBlogs && allBlogCategory) {
      var size = 4;
      var arrayOfArrays = [];
      var singleCategoryBlogs = [];

      // for (var j = 0; j < blogs.length; j++) {
      //   for (var k = 0; k < blogs[j].blogCategory; k++) {
      //     if (blogs[j].blogCategory[k].categoryName === selectedCategory) {
      //       singleCategoryBlogs.push(blogs[j]);
      //     }
      //   }
      // }
      const blogCatID = allBlogCategory.filter(
        (bcat) => bcat.name === selectedCategory
      );
      console.log(blogCatID);
      allBlogs.forEach((singleBlog) => {
        if (
          (singleBlog.blogCategory?.filter(
            (bcat) => bcat.categoryName === blogCatID[0]?._id
          )).length > 0
        ) {
          singleCategoryBlogs.push(singleBlog);
        }
      });

      for (var i = 0; i < singleCategoryBlogs.length; i += size) {
        arrayOfArrays.push(singleCategoryBlogs.slice(i, i + size));
      }

      settemparray(arrayOfArrays);
    }
  }, [allBlogs, selectedCategory, allBlogCategory]);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const CustomLeft = ({ onClick }) => (
    <button
      className="course-carousel-icon-button course-carousel-icon-left"
      onClick={onClick}
    >
      {/* <img src={ArrowBack} className="course-carousel-icon" /> */}
      <ArrowBack className="course-carousel-icon" />
    </button>
  );

  const CustomRight = ({ onClick }) => (
    <button
      className="course-carousel-icon-button course-carousel-icon-right"
      onClick={onClick}
    >
      {/* <img src={ArrowBack} className="course-carousel-icon" /> */}
      <ArrowForwardIcon className="course-carousel-icon" />
    </button>
  );
  useEffect(() => {
    const onresize = () => {
      if (window.screen.width > 600) {
        setIsMobileView(false);
        setDesktopView(true);
      }
    };
    window.addEventListener("resize", onresize);
    onresize();

    return () => {
      window.removeEventListener("resize", onresize);
    };
  }, []);

  return (
    <div className="blog">
      {!isMobileView && (
        <div className="blog__categoryMobile">
          <label className="blog__categoryList__label">
            Select A Particular Category
          </label>
          <select
            className="blog__categoryList__select"
            value={selectedCategory}
            onChange={(e) => setselectedCategory(e.target.value)}
          >
            {allBlogCategory?.map((blogCat) => {
              return <option value={blogCat.name}> {blogCat.name}</option>;
            })}
          </select>
        </div>
      )}
      {
        <div className="blog__category">
          <ul className="blog__categoryList">
            {allBlogCategory?.map((blogCat) => {
              return (
                <li
                  className={selectedCategory === blogCat.name && "selected"}
                  onClick={() => setselectedCategory(blogCat.name)}
                >
                  {blogCat.name}
                </li>
              );
            })}
          </ul>
        </div>
      }

      {temparray.map((blogSet, index) => {
        return (
          <div className="blog__cardsContainer">
            {blogSet[0] && <BlogCard isVertical={false} blog={blogSet[0]} />}
            {isMobileView ? (
              <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                infinite={true}
                // arrows={false}
                // autoPlay={true}
                // autoPlaySpeed={2500}
                // centerMode={showCenteredMode}
                customLeftArrow={<CustomLeft />}
                customRightArrow={<CustomRight />}
                // keyBoardControl={true}
                className="blog__cards__carousel"
              >
                {blogSet[1] && <BlogCard isVertical={true} blog={blogSet[1]} />}
                {blogSet[2] && <BlogCard isVertical={true} blog={blogSet[2]} />}
                {blogSet[3] && <BlogCard isVertical={true} blog={blogSet[3]} />}
              </Carousel>
            ) : (
              <div className="blog__cardsContainer__vertical">
                {blogSet[1] && <BlogCard isVertical={true} blog={blogSet[1]} />}
                {blogSet[2] && <BlogCard isVertical={true} blog={blogSet[2]} />}
                {blogSet[3] && <BlogCard isVertical={true} blog={blogSet[3]} />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Index;
