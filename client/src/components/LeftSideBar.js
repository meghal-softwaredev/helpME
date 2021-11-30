import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from "../mui/themes";
import "../styles/components/LeftSideBar.scss";
import { Button, Box, Divider, Container, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import NewGroup from './NewGroup';

import PostAddIcon from '@mui/icons-material/PostAdd';
import FeedIcon from '@mui/icons-material/Feed';
import EventIcon from '@mui/icons-material/Event';
import NewFeed from "./NewFeed";

import { listCategories } from '../actions/categoryActions';
import {
  showProfileDetails,
  changeCurrentCategory,
} from "../actions/profileActions";

function LeftSideBar() {
  const location = useLocation();

  const [openNewGroup, setOpenNewGroup] = useState(false);
  const [openNewFeed, setOpenNewFeed] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const profileDetailsList = useSelector((state) => state.profileDetailsList);
  const { loading, error, profileDetails } = profileDetailsList;


  const dispatch = useDispatch();
  useEffect(() => {
    userInfo && dispatch(showProfileDetails(userInfo._id));
  }, []);

  useEffect(() => {
    setSelectedCategory(profileDetails && profileDetails.current_category);
  }, [profileDetails]);

  //const [selectedCategory, setSelectedCategory] = useState(profileDetails ? profileDetails.current_category : "");
  //const [selectedCategory, setSelectedCategory] = useState(profileDetails ? profileDetails.current_category : "");

  /* if (profileDetails) {
    if(profileDetails.current_category) {
      setSelectedCategory(profileDetails.current_category);
    }
  } */

  /* console.log("selectedCategory:", selectedCategory);
  console.log("profileDetails:", profileDetails ? profileDetails.current_category : ""); */

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
    dispatch(changeCurrentCategory({ user_id: userInfo._id, updated_current_category: e.target.value}));
  };

  const handleOpenNewGroup = () => {
    setOpenNewGroup(true);
  };

  const handleCloseNewGroup = () => {
    setOpenNewGroup(false);
  };

  const handleOpenNewFeed = () => {
    setOpenNewFeed(true);
  };

  const handleCloseNewFeed = () => {
    setOpenNewFeed(false);
  };

  /* const feedButtonStyle =
    location.pathname === "/feeds" && {border: "solid 1px white", backgroundColor: "#adb5bd30" };
  const eventButtonStyle =
    location.pathname === "/events" && { border: "solid 1px white", backgroundColor: "#adb5bd30" }; */

  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="left-sidebar-container" sx={{
        border: '1px solid #218380', my: 2, p: 2 }}>
        <ul className="reset-ul">
          <li>
            <Link className="link" to="/feeds">
              <Button startIcon={<FeedIcon />}>Feeds</Button>
            </Link>
          </li>
          <li>
            <Link className="link" to="/events">
              <Button startIcon={<EventIcon />}>Events</Button>
            </Link>
          </li>
          <li>
            <Divider sx={{ my: 2 }} />
          </li>
          <li>
            <Button
                startIcon={<PostAddIcon />}
                variant="outlined"
                onClick={handleOpenNewFeed}>
                Post Question
              </Button>
            {openNewFeed && (<NewFeed activity="NewFeed" openNewFeed={openNewFeed} handleCloseNewFeed={handleCloseNewFeed} />)}
          </li>
          <li>
            <Button startIcon={<PostAddIcon />} sx={{ mt: 1 }} variant="outlined" onClick={handleOpenNewGroup}>
              Create Group
            </Button>
            <NewGroup openNewGroup={openNewGroup} handleCloseNewGroup={handleCloseNewGroup} edit={false} />
          </li>
          <li>
            <Divider sx={{ my: 2 }} />
          </li>
          <li>
            <FormControl fullWidth size="medium">
              <InputLabel sx={{fontSize:"15px"}}>Category</InputLabel>
              <Select
                id="category"
                value={selectedCategory}
                label="Category"
                onChange={handleCategoryChange}
              >
                {categories && categories.map((category) => (
                  <MenuItem
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </li>
        </ul>
      </Box>
    </ThemeProvider>
  )
}

export default LeftSideBar
