import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import "../styles/components/GetHelp.scss";

import { darkTheme } from "../mui/themes";
import {
  showProfileDetails,
} from "../actions/profileActions";
import IndividualVolunteer from "./IndividualVolunteer";
import VolunteerList from "./VolunteerList";

function GetHelp() {
  const navigate = useNavigate();

  const [currentVolunteer, setCurrentVolunteer] = useState("");

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

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const handleShowVolunteer = (volunteer_id) => {
    setCurrentVolunteer(volunteer_id);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="main-volunteers-container">
        < IndividualVolunteer currentVolunteer={currentVolunteer} />
        <VolunteerList handleShowVolunteer={handleShowVolunteer} />
      </div>
    </ThemeProvider>
  )
}

export default GetHelp
