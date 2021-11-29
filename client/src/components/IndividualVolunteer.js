import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { Box, IconButton, Container, Typography, Divider, Chip, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Drawer from '@mui/material/Drawer';
import "../styles/components/Profile.scss";
import Chat from './Chat';

import {
  showProfileDetails,
} from "../actions/profileActions";

function IndividualVolunteer(props) {
  const [drawerOpen, setDrawerOpen] = useState();
  const navigate = useNavigate();

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
      props.currentVolunteer && dispatch(showProfileDetails(props.currentVolunteer));
  }, [dispatch, props.currentVolunteer]);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  }
  const handleDrawerOpen = () => { 
    setDrawerOpen(true);
  }

  if (!props.currentVolunteer) {
    return (
      <div className="profile-container">
        <p>Select Volunteer to show volunteer details</p>
      </div>
    );
  }
  return (
        <div className="profile-container">
          <div className="profile-container-header" />
          <Box className="section profile-picture-container" >
            <Avatar
              //alt={profileDetails && profileDetails.user && profileDetails.user.name}
              src={`${process.env.PUBLIC_URL}/images/avatar/profile-avatar.jpeg`}
              sx={{ width: 200, height: 200 }} />
          </Box>
          <div className="section basic-info-container">
            <p className="section-title">{profileDetails && profileDetails.user && profileDetails.user.name}</p>
          </div>
          <Divider sx={{ mx: 2 }} />
          <div className="section bio-details-container">
            <div>
              <p className="section-title">Bio</p>
              <p>{profileDetails && profileDetails.bio}</p>
            </div>
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
          </div>
          <Divider sx={{ mx: 2 }} />
          <div className="section skills-container">
            <div>
              <p className="section-title">Skills</p>
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
          </div>
          <Divider sx={{ mx: 2 }} />
          <div className="section connect-container">
            <div>
          <Button variant="outlined" size="large" onClick={handleDrawerOpen}>Connect</Button>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => { handleDrawerClose(false) }}
          >
            {profileDetails && <Chat />}
          </Drawer>
            </div>
          </div>
        </div>
  )
}

export default IndividualVolunteer

