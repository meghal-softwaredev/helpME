import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";

import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            helpME
            <i class="fas fa-hands-helping"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {userInfo ? (
              <>
                <li className="nav-item">
                  <Link className="nav-links" to="#">
                    {" "}
                    Name
                    {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-links" to="/profile">
                    User Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-links"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="events"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Events
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="about-us"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/feeds"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Feeds
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signin"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="nav-links-mobile"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
          {button && <Button buttonStyle="btn--outline">SIGN UP</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
