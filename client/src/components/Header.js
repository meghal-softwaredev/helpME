import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/components/Header.scss";
import "../styles/elements/link.scss";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";

import { ThemeProvider } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { CssBaseline } from "@mui/material";

import { darkTheme } from "../mui/themes";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleOpenProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  };

  let inputStyle =
    location.pathname === "/"
      ? {
        background: "#082449"
      }
      : { background: "#023047"};

  return (
    <>
      {/* <Box className="header" sx={{ flexGrow: 1 }}> */}
      <CssBaseline />
      <AppBar
        //style={{ background: "#023047" }}
        //style={{ background: "#242424" }}
        style={inputStyle}
        className="header"
        position="fixed"
        sx={{ justifyContent: "center", minHeight: "80px" }}
      >
        <Toolbar>
          <Link className="link" to="/">
            <Typography variant="h4" component="div">
              helpME
              <i className="fas fa-hands-helping"></i>
            </Typography>
          </Link>
          {/* <Box sx={{ ml: 5, flexGrow: 1 }}>
            <Link to="/get-help" className="link nav-link get-help-btn">
              Get Help
            </Link>
          </Box> */}
          {userInfo ? (
            <>
            <Box sx={{ ml: 5, flexGrow: 1 }}>
              <Link className="link nav-link get-help-btn" to="/getHelp">
                Get Help
              </Link>
            </Box>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{mr:5}}
              >
                <AccountCircle sx={{ fontSize: "35px" }} />
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
                <MenuItem sx={{backgroundColor:"transparent"}} onClick={handleOpenProfile}>Profile</MenuItem>
                <MenuItem sx={{backgroundColor:"transparent"}} onClick={signoutHandler}>Logout</MenuItem>
              </Menu>
            </div>
            </>
          ) : (
            <>
              <Box sx={{ ml: 5, flexGrow: 1 }} />
              <div>
                <Link className="link nav-link" to="/events">
                  Events
                </Link>
                <Link className="link nav-link" to="/feeds">
                  Feed
                </Link>
                <Link className="link nav-link" to="/about-us">
                  About Us
                </Link>
                <Link className="link nav-link" to="/register">
                  Register
                </Link>
                <Link className="link nav-link" to="/signin">
                  Login
                </Link>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* </Box> */}
    </>
  );
}

export default Header;
