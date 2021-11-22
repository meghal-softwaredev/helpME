import { Link } from "react-router-dom";
import "../styles/components/LeftSideBar.scss";
import React, { useState} from 'react';
import { Button } from '@mui/material';
import NewGroup from './NewGroup';

function LeftSideBar() {
  const [openNewGroup, setOpenNewGroup] = useState(false);

  const handleOpenNewGroup = () => {
    setOpenNewGroup(true);
  };

  const handleCloseNewGroup = () => {
    setOpenNewGroup(false);
  };

  return (
    <div className="left-sidebar-container" >
      <ul className="reset-ul">
        <li>
          <Link className="link" to="/feeds">Feeds</Link>
        </li>
        <li>
          <Link className="link" to="/events">Events</Link>
        </li>
        <li>
          <Button size="small" variant="outlined" sx={{color:"white"}} onClick={handleOpenNewGroup}>
            Create Group
          </Button>
          <NewGroup openNewGroup={openNewGroup} handleCloseNewGroup={handleCloseNewGroup} edit={false}/>      
        </li>
      </ul>
    </div>
  )
}

export default LeftSideBar
