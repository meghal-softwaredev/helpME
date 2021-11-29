import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Divider } from "@mui/material";

import "../styles/components/VolunteerList.scss";

import {
  showVolunteerList,
} from "../actions/volunteerActions";
import VolunteerListItem from "./VolunteerListItem";

function VolunteerList(props) {

  const navigate = useNavigate();

  const volunteerList = useSelector((state) => state.volunteerList);
  const { loading, error, volunteers } = volunteerList;
  console.log(volunteerList);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showVolunteerList());
  }, [dispatch]);

  useEffect(() => {
    Array.isArray(volunteers) && volunteers[0] && props.handleShowVolunteer(volunteers[0].user._id);
  }, [volunteerList]);

  return (
    <div className="volunteers-list-container">
      {volunteers && Array.isArray(volunteers) && volunteers.map((volunteer, index) => (
        <>
          <VolunteerListItem volunteer={volunteer} handleShowVolunteer={props.handleShowVolunteer} />
          {(volunteers.length - 1) > index && (<Divider />)}
        </>
      ))}
    </div>
  )
}

export default VolunteerList
