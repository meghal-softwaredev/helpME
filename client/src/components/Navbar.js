import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import { ThemeProvider } from "@mui/material/styles";

import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
//import Button from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { CssBaseline } from "@mui/material";

import { darkTheme } from "../mui/themes";

function Navbar() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const handleOpenProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  };

  return (
    <ThemeProvider theme={darkTheme}>
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
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
                  <MenuItem onClick={signoutHandler}>Logout</MenuItem>
                </Menu>
              </div>
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
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!userInfo && button && (
            <Button buttonStyle="btn--outline">Register</Button>
          )}
        </div>
      </nav>
    </ThemeProvider>
  );
}
// To correct two navbar issue do the following:
// Have nav bar recieve a prop called usersignedin
// In nav bar if user signed is true show links for signed in user if false show nor signed in links
// In app.js replace the header with <navbar usersignedin={true}/>
export default Navbar;
