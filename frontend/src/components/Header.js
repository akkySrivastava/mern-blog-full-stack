import React, { useEffect, useRef, useState } from "react";
import "./css/Header.css";
import { useHistory } from "react-router-dom";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import CloseIcon from "@material-ui/icons/CloseRounded";
import logo from "./img/logo.png";

function Index() {
  const header = useRef(null);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const navOpenHandler = () => {
    if (window.innerWidth <= 600) {
      setIsOpenNav(true);
    }
  };

  useEffect(() => {
    const onresize = () => {
      if (window.screen.width > 600) setIsOpenNav(false);
    };
    window.addEventListener("resize", onresize);
    onresize();

    return () => {
      window.removeEventListener("resize", onresize);
    };
  }, []);

  const links = [
    {
      id: 1,
      text: "Home",
      link: "/",
    },
    {
      id: 2,
      text: "BlogAdmin",
      link: "/blogadmin",
    },
  ];

  const handlelinks = (link) => {
    setIsOpenNav(false);
    history.push(link);
  };

  const SideNav = () => {
    return (
      <div ref={header} className="side-navs">
        <div className="side-nav-container">
          <div className="side-nav-app">
            <div onClick={goHome} className="side-nav-logo">
              <img className="side-nav-icon" alt="logo" src={logo} />
              <div className="side-nav-brand">
                <p>Code With Akky's Blogs</p>
              </div>
            </div>
          </div>
          <div onClick={() => setIsOpenNav(false)} className="side-nav-close">
            <CloseIcon />
          </div>
        </div>

        <>
          {links.map((data) => (
            <div
              onClick={() => handlelinks(data.link)}
              id={data.id}
              className="side-nav"
            >
              <p>{data.text}</p>
            </div>
          ))}
          {/* <div className="side-nav">
            <p>Home</p>
          </div>
          <div className="side-nav">
            <p>Blog</p>
          </div>
          <div className="side-nav">
            <p>Courses</p>
          </div>
          <div className="side-nav">
            <p>About Us</p>
          </div>
          <div className="side-nav">
            <p>Signup/Login</p>
          </div> */}
        </>
      </div>
    );
  };
  // const navCloseHandler = () => {
  //   setIsOpenNav(false);
  // };

  const history = useHistory();

  const goHome = () => {
    setIsOpenNav(false);
    history.push("/");
  };

  return (
    <>
      {!isOpenNav ? (
        <header className="header" ref={header}>
          <div className="header-app">
            <div onClick={goHome} className="header-logo">
              <img className="header-logo-icon" alt="logo" src={logo} />
              <div className="app-brand">
                <p>Code With Akky's Blogs</p>
              </div>
            </div>
            <>
              <div className="header-navs">
                {links.map((data) => (
                  <>
                    <div className="header-nav">
                      <p id={data.id} onClick={() => handlelinks(data.link)}>
                        {data.text}
                      </p>
                    </div>
                  </>
                ))}
              </div>
              <div onClick={navOpenHandler} className="nav-menu-icon">
                <MenuRoundedIcon />
              </div>
            </>
          </div>
        </header>
      ) : (
        <>
          <SideNav />
        </>
      )}
    </>
  );
}

export default Index;
