import React, { useState} from 'react';
import { Button } from '@mui/material';
import NewGroup from './NewGroup';
import NewEvent from './NewEvent';

function RightSideBar() {
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
    <div>
      <div>
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
      </div>
    </div>
  )
}

export default RightSideBar;
