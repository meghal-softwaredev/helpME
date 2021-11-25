import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Container, Avatar, Typography, Grid, TextField } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';

export default function EditProfileDrawer(props) {

  const { sections, profileDetails, currentEditSection, drawerOpen, handleDrawerClose, handleUpdateProfile } = props;

  const [updatedProfileDetails, setUpdatedProfileDetails] = useState(profileDetails ? { ...profileDetails} : {})

  const handleProfileDetailsChange = (e, field) => {
    field === "name" && setUpdatedProfileDetails(prev => ({ ...prev, user: { ...prev.user, name: e.target.value }}));
    field === "email" && setUpdatedProfileDetails(prev => ({ ...prev, user: { ...prev.user, email: e.target.value } }));
    field === "password" && setUpdatedProfileDetails(prev => ({ ...prev, user: { ...prev.user, password: e.target.value } }));
    field === "bio" && setUpdatedProfileDetails(prev => ({ ...prev, bio: e.target.value }));
  }
  console.log("updatedProfileDetails",updatedProfileDetails);
  const list = () => (
    <Box
      sx={{ width: 450 }}
      role="presentation"
      /* onClick={() => {handleDrawerClose(false)}}
      onKeyDown={() => {handleDrawerClose(false)}} */
    >
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit {sections[currentEditSection].title}
        </Typography>
        <Box component="form" noValidate onSubmit={(event) => handleUpdateProfile(event, updatedProfileDetails)} sx={{ m: 3, width:'80%' }}>
          <Grid container spacing={2}>
              {currentEditSection === "basic_info" && <EditIntro updatedProfileDetails={updatedProfileDetails} handleProfileDetailsChange={handleProfileDetailsChange} />}
            {currentEditSection === "bio_details" && <EditBio updatedProfileDetails={updatedProfileDetails} handleProfileDetailsChange={handleProfileDetailsChange} />}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => { handleDrawerClose(false) }}
      >
        {list()}
      </Drawer>
    </div>
  );
}

const EditIntro = (props) => {
  const { updatedProfileDetails, handleProfileDetailsChange } = props;
  return (
    <>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="name"
          label="Name"
          placeholder="Name"
          value={updatedProfileDetails.user.name}
          onChange={(event) => handleProfileDetailsChange(event, "name")}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email"
          placeholder="Email"
          value={updatedProfileDetails.user.email}
          onChange={(event) => handleProfileDetailsChange(event, "email")}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="password"
          label="Password"
          type="password"
          placeholder="Password"
          value={updatedProfileDetails.user.password}
          onChange={(event) => handleProfileDetailsChange(event, "password")}
        />
      </Grid>
    </>
  );
}

const EditBio = (props) => {
  const { updatedProfileDetails, handleProfileDetailsChange } = props;
  return (
    <>
      <TextField
        required
        fullWidth
        id="bio"
        label="Bio"
        placeholder="Bio"
        multiline
        rows={4}
        value={updatedProfileDetails.bio}
        onChange={(event) => handleProfileDetailsChange(event, "bio")}
      />
    </>
  );
}