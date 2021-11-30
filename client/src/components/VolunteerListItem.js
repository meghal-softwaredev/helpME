import React, {useState} from "react";

import { Box, Avatar, Typography } from "@mui/material";

import "../styles/components/VolunteerListItem.scss";

function VolunteerListItem(props) {
  
  const { volunteer, handleShowVolunteer} = props;

  return (
    <>
      <div className="volunteer-list-item-container" role="button" onClick={() => handleShowVolunteer(volunteer.user._id)}>
        <Box >
          <Avatar
            //alt={profileDetails && profileDetails.user && profileDetails.user.name}
            //src={imageName ? `${process.env.PUBLIC_URL}/images/avatar/${imageName}` : `${process.env.PUBLIC_URL}/images/avatar/profile-avatar-1.webp`}
            src={volunteer && volunteer.photo_url ? `${process.env.PUBLIC_URL}/images/avatar/${volunteer.photo_url}` : `${process.env.PUBLIC_URL}/images/avatar/profile-avatar-1.webp`}
            sx={{ width: 50, height: 50 }} />
        </Box>
        <Typography sx={{fontSize:"18px"}}>{volunteer && volunteer.user && volunteer.user.name}</Typography>
      </div>
    </>
  )
}

export default VolunteerListItem
