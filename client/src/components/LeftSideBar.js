import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from "../mui/themes";
import "../styles/components/LeftSideBar.scss";
import { Button, Box, Divider, Container } from '@mui/material';
import NewGroup from './NewGroup';

import PostAddIcon from '@mui/icons-material/PostAdd';
import FeedIcon from '@mui/icons-material/Feed';
import EventIcon from '@mui/icons-material/Event';
import NewFeed from "./NewFeed";

function LeftSideBar() {
  const [openNewGroup, setOpenNewGroup] = useState(false);
  const [openNewFeed, setOpenNewFeed] = useState(false);

  const handleOpenNewGroup = () => {
    setOpenNewGroup(true);
  };

  const handleCloseNewGroup = () => {
    setOpenNewGroup(false);
  };

  const handleOpenNewFeed = () => {
    setOpenNewFeed(true);
  };

  const handleCloseNewFeed = () => {
    setOpenNewFeed(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="left-sidebar-container" sx={{ border: '1px solid #0077b6', my: 2, p: 2 }}>
        <ul className="reset-ul">
          <li>
            <Link className="link" to="/feeds">
              <Button startIcon={<FeedIcon />}>Feeds</Button>
            </Link>
          </li>
          <li>
            <Link className="link" to="/events">
              <Button startIcon={<EventIcon />}>Events</Button>
            </Link>
          </li>
          <li>
            <Divider sx={{ my: 2 }} />
          </li>
          <li>
              <Button
                startIcon={<PostAddIcon />}
                variant="outlined"
                onClick={handleOpenNewFeed}>
                Post Question
              </Button>
            {openNewFeed && (<NewFeed activity="NewFeed" openNewFeed={openNewFeed} handleCloseNewFeed={handleCloseNewFeed} />)}
          </li>
          <li>
              <Button startIcon={<PostAddIcon />} sx={{ mt: 1 }} variant="outlined" onClick={handleOpenNewGroup}>
              Create Group
            </Button>
            <NewGroup openNewGroup={openNewGroup} handleCloseNewGroup={handleCloseNewGroup} edit={false} />
          </li>
        </ul>
      </Box>
    </ThemeProvider>
  )
}

export default LeftSideBar
