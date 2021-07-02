import React, { useEffect, useRef, useState } from "react";
import "./css/Header.css";
import { useHistory } from "react-router-dom";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import CloseIcon from "@material-ui/icons/CloseRounded";
import logo from "./img/logo.png";
import facebook from "./img/facebook.png";
import youtube from "./img/youtube.png";
import github from "./img/github.png";
import instagram from "./img/instgram.png";
import twitter from "./img/twitter.png";

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

  const socialLinks = [
    {
      id: 1,
      icon: instagram,
      link: "https://instgram.com/code_with_akky",
    },
    {
      id: 2,
      icon: facebook,
      link: "https://facebook.com/akkyProjects",
    },
    {
      id: 3,
      icon: youtube,
      link: "https://youtube.com/c/CodeWithAkky",
    },
    {
      id: 4,
      icon: github,
      link: "https://github.com/akkySrivastava",
    },
    {
      id: 5,
      icon: twitter,
      link: "https://twitter.com/akky_im",
    },
  ];

  const handlelinks = (link) => {
    setIsOpenNav(false);
    history.push(link);
  };

  const handleSocialLinks = (link) => {
    window.open(link, "_blank", "noopenner noreferrer");
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
          <div className="side-nav-socials">
            {socialLinks.map((data) => (
              <div
                onClick={() => handleSocialLinks(data.link)}
                id={data.id}
                className="side-nav-social"
              >
                <img src={data.icon} alt="social-logo" />
              </div>
            ))}
          </div>

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
