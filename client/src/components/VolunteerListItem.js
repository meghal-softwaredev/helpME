import { Button } from "@mui/material";
import React from "react";
import "../styles/components/VolunteerListItem.scss";

function VolunteerListItem(props) {
  const { volunteer, handleShowVolunteer} = props;
  return (
    <>
      <div className="volunteer-list-item-container">
        <Button onClick={() => handleShowVolunteer(volunteer.user._id)}>
          <p>{volunteer && volunteer.user && volunteer.user.name}</p>
        </Button>
      </div>
    </>
  )
}

export default VolunteerListItem
