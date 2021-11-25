import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { Box, IconButton, Container, Typography, Divider, Chip } from "@mui/material";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';

import "../styles/components/Profile.scss";

import { darkTheme } from "../mui/themes";
import {
  showProfileDetails,
} from "../actions/profileActions";
import { flexbox } from "@mui/system";
import EditProfileDrawer from "./EditProfileDrawer";

function ShowProfile() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentEditSection, setCurrentEditSection] = useState("");

  const sections = {
    "basic_info": {
      title: "Intro"
    },
    "bio_details": {
      title: "Bio"
    },
    "profile_links": {
      title: "Profile Links"
    },
    "skills": {
      title: "Skills"
    }
  };

  const profileDetailsList = useSelector((state) => state.profileDetailsList);
  const { loading, error, profileDetails } = profileDetailsList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showProfileDetails({}));
  }, [dispatch]);

  /* const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 100,
    height: 100,
    border: `2px solid ${theme.palette.background.paper}`,
  })); */

  const handleDrawerClose = (status) => {
    setDrawerOpen(status);
  }
  const handleEditBtn = (sectionName) => { 
    setCurrentEditSection(sectionName);
    setDrawerOpen(true);
  }

  const handleUpdateProfile = (event, updatedProfileDetails) => {
    event.preventDefault();
    /* dispatch(updateProfileDetails({ ...updatedProfileDetails, currentEditSection })); */
    setDrawerOpen(false)
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="profile-container">
        <div className="profile-container-header" />
        <Box className="section profile-picture-container" >
          <Avatar
            //alt={profileDetails && profileDetails.user && profileDetails.user.name}
            src="images/avatar/profile-avatar.jpg"
            sx={{ width: 200, height: 200 }} />
        </Box>
        <div className="section basic-details-container">
          <p>{profileDetails && profileDetails.user && profileDetails.user.name}</p>
          <Box>
            <IconButton color="primary" aria-label="edit profile" component="span" onClick={() => {handleEditBtn("basic_info")}}>
              <EditIcon />
            </IconButton>
          </Box>
        </div>
        <Divider sx={{ mx: 2 }} />
        <div className="section bio-details-container">
          <div>
            <p>Bio</p>
            <p>{profileDetails && profileDetails.bio}</p>
          </div>
          <Box>
            <IconButton color="primary" aria-label="edit profile" component="span" onClick={() => { handleEditBtn("bio_details") }}>
              <EditIcon />
            </IconButton>
          </Box>
        </div>
        <Divider sx={{ mx: 2 }} />
        <div className="section profile-links-container">
          <div>
            <p>Profile Links</p>
            <p>Github: {profileDetails && profileDetails.github_url}</p>
            <p>LinkedIn: {profileDetails && profileDetails.linkedin_url}</p>
            <p>Facebook: {profileDetails && profileDetails.facebook_url}</p>
            <p>Instagram: {profileDetails && profileDetails.instagram_url}</p>
            <p>twitter_url: {profileDetails && profileDetails.twitter_url}</p>
          </div>
          <Box>
            <IconButton color="primary" aria-label="edit profile" component="span" onClick={() => { handleEditBtn("profile_links") }}>
              <EditIcon />
            </IconButton>
          </Box>
        </div>
        <Divider sx={{ mx: 2 }} />
        <div className="section skills-container">
          <div>
            <p>Skills</p>
            <Box>
              {profileDetails && profileDetails.skills && profileDetails.skills.map((skill) => (
                <Chip
                  key={skill}
                  sx={{ mr: 1 }}
                  label={skill}
                  color="secondary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </div>
          <Box>
            <IconButton color="primary" aria-label="edit profile" component="span" onClick={() => { handleEditBtn("skills") }}>
              <EditIcon />
            </IconButton>
          </Box>
        </div>
        <Divider sx={{ mx: 2 }} />
        <div className="section skills-container">
          <div>
            <p>Do tou want yo join our community as a volunteer?</p>
          </div>
        </div>
        {drawerOpen && (
          <EditProfileDrawer 
            sections={sections}
            profileDetails={profileDetails}
            currentEditSection={currentEditSection} 
            drawerOpen={drawerOpen} 
            handleDrawerClose={handleDrawerClose}
            handleUpdateProfile={handleUpdateProfile} />
          )}
      </div>

    </ThemeProvider>
  )
}

export default ShowProfile
