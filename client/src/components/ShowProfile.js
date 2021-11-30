import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { Box, IconButton, Container, Typography, Divider, Chip } from "@mui/material";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

import "../styles/components/Profile.scss";

import { darkTheme } from "../mui/themes";
import {
  showProfileDetails,
  updateProfile,
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
    },
    /* "preferences": {
      title: "Preferences"
    }, */
    "volunteer_status": {
      title: "Volunteer Status"
    }
  };

  const profileDetailsList = useSelector((state) => state.profileDetailsList);
  const { loading, error, profileDetails } = profileDetailsList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showProfileDetails(userInfo._id));
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
    dispatch(updateProfile({ ...updatedProfileDetails, currentEditSection }));
    setDrawerOpen(false)
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="profile-container">
        <div className="profile-container-header" />
        <Box className="section profile-picture-container" >
          <Avatar
            //alt={profileDetails && profileDetails.user && profileDetails.user.name}
            //src={`${process.env.PUBLIC_URL}/images/avatar/profile-avatar.jpeg`}
            //src={`${process.env.PUBLIC_URL}/images/avatar/profile-avatar-1.webp`}
            src={profileDetails && profileDetails.photo_url ? `${process.env.PUBLIC_URL}/images/avatar/${profileDetails.photo_url}` : `${process.env.PUBLIC_URL}/images/avatar/profile-avatar-1.webp`}
            sx={{ width: 200, height: 200 }} />
        </Box>
        <div className="section basic-info-container">
          <p className="section-title">{profileDetails && profileDetails.user && profileDetails.user.name}</p>
          <Box>
            <IconButton sx={{ color: "#f4b942" }} aria-label="edit profile" component="span" onClick={() => {handleEditBtn("basic_info")}}>
              <EditIcon />
            </IconButton>
          </Box>
        </div>
        <Divider sx={{ mx: 2 }} />
        <div className="section bio-details-container">
          <div>
            <p className="section-title">Bio</p>
            <p className="section-description">{profileDetails && profileDetails.bio}</p>
          </div>
          <Box>
            <IconButton sx={{ color: "#f4b942" }} aria-label="edit profile" component="span" onClick={() => { handleEditBtn("bio_details") }}>
              <EditIcon />
            </IconButton>
          </Box>
        </div>
        <Divider sx={{ mx: 2 }} />
        <div className="section profile-links-container">
          <div>
            <p className="section-title">Profile Links</p>
            <Box className="profile-link-row"><GitHubIcon /> {profileDetails && profileDetails.github_url}</Box>
            <Box className="profile-link-row"><LinkedInIcon /> {profileDetails && profileDetails.linkedin_url}</Box>
            <Box className="profile-link-row"><FacebookIcon /> {profileDetails && profileDetails.facebook_url}</Box>
            <Box className="profile-link-row"><InstagramIcon /> {profileDetails && profileDetails.instagram_url}</Box>
            <Box className="profile-link-row"><TwitterIcon /> {profileDetails && profileDetails.twitter_url}</Box>
          </div>
          <Box>
            <IconButton sx={{ color: "#f4b942" }} aria-label="edit profile" component="span" onClick={() => { handleEditBtn("profile_links") }}>
              <EditIcon />
            </IconButton>
          </Box>
        </div>
        <Divider sx={{ mx: 2 }} />
        <div className="section skills-container">
          <div>
            <p className="section-title">Skills</p>
            <Box>
              {profileDetails && profileDetails.skills && profileDetails.skills.map((skill) => (
                <Chip
                  key={skill}
                  sx={{ mr: 2, fontSize: "16px" }}
                  label={skill}
                  color="primary"
                  variant="outlined"
                  size="large"
                />
              ))}
            </Box>
          </div>
          <Box>
            <IconButton sx={{ color: "#f4b942" }} aria-label="edit profile" component="span" onClick={() => { handleEditBtn("skills") }}>
              <EditIcon />
            </IconButton>
          </Box>
        </div>
        <Divider sx={{ mx: 2 }} />
        {/* <div className="section preferences-container">
          <div>
            <p className="section-title">Preferences</p>
            <Box>
              {profileDetails && profileDetails.preferred_categories && profileDetails.preferred_categories.map((preference) => (
                <Chip
                  key={preference}
                  sx={{ mr: 2, fontSize: "16px" }}
                  label={preference}
                  color="primary"
                  variant="outlined"
                  size="large"
                />
              ))}
            </Box>
          </div>
          <Box>
            <IconButton sx={{ color: "#f4b942" }} aria-label="edit profile" component="span" onClick={() => { handleEditBtn("preferences") }}>
              <EditIcon />
            </IconButton>
          </Box>
        </div>
        <Divider sx={{ mx: 2 }} /> */}
        <div className="section volunteer-container">
          <div>
            <p>Do you want to join our community as a volunteer?</p>
          </div>
          <Box>
            <IconButton sx={{ color: "#f4b942" }} aria-label="edit profile" component="span" onClick={() => { handleEditBtn("volunteer_status") }}>
              <EditIcon />
            </IconButton>
          </Box>
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
