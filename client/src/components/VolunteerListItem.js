import React, {useState} from "react";

import { Box, Avatar, Typography } from "@mui/material";

import "../styles/components/VolunteerListItem.scss";

function VolunteerListItem(props) {
  const [imageName, setImageName] = useState(getRandomImageName());
  
  const { volunteer, handleShowVolunteer} = props;
  
  function getRandomImageName() {
    const min = 1;
    const max = 7;
    const rand = Math.floor(Math.random() * max) + min;
    console.log("rand:", rand);
    return `profile-avatar-${rand}.webp`;
  }

  return (
    <>
      <div className="volunteer-list-item-container" role="button" onClick={() => handleShowVolunteer(volunteer.user._id)}>
        <Box >
          <Avatar
            //alt={profileDetails && profileDetails.user && profileDetails.user.name}
            src={imageName ? `${process.env.PUBLIC_URL}/images/avatar/${imageName}` : `${process.env.PUBLIC_URL}/images/avatar/profile-avatar-1.webp`}
            sx={{ width: 70, height: 70 }} />
        </Box>
        <Typography sx={{fontSize:"18px"}}>{volunteer && volunteer.user && volunteer.user.name}</Typography>
      </div>
    </>
  )
}

export default VolunteerListItem
