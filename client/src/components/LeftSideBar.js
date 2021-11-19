import { Link } from "react-router-dom";
import "../styles/components/LeftSideBar.scss";
import React, { useState} from 'react';
import { Button } from '@mui/material';
import NewGroup from './NewGroup';
import NewEvent from './NewEvent';

function LeftSideBar() {
  const [openNewGroup, setOpenNewGroup] = useState(false);
  const [openNewEvent, setOpenNewEvent] = useState(false);

  const handleOpenNewGroup = () => {
    setOpenNewGroup(true);
  };

  const handleCloseNewGroup = () => {
    setOpenNewGroup(false);
  };

  const handleOpenNewEvent = () => {
    setOpenNewEvent(true);
  };

  const handleCloseNewEvent = () => {
    setOpenNewEvent(false);
  };
  return (
    <div className="left-sidebar-container">
      <ul className="reset-ul">
        <li>
          <Link className="link" to="/feeds">Feeds</Link>
        </li>
        <li>
          <Link className="link" to="/events">Events</Link>
        </li>
        <li>
          <Button size="small" variant="contained" onClick={handleOpenNewGroup}>
            Create Group
          </Button>
          <NewGroup openNewGroup={openNewGroup} handleCloseNewGroup={handleCloseNewGroup} />
          <br />
          <br />
          <Button size="small" variant="contained" onClick={handleOpenNewEvent}>
            Create Event
          </Button>
          <NewEvent openNewEvent={openNewEvent} handleCloseNewEvent={handleCloseNewEvent} />
        </li>
      </ul>
    </div>
  )
}

export default LeftSideBar
