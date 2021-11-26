import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Container, Avatar, Typography, Grid, TextField, InputAdornment, Paper, Chip, Checkbox, FormControlLabel } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function EditProfileDrawer(props) {

  const { sections, profileDetails, currentEditSection, drawerOpen, handleDrawerClose, handleUpdateProfile } = props;

  const [updatedProfileDetails, setUpdatedProfileDetails] = useState(profileDetails ? { ...profileDetails, skill: ""} : {})

  const handleProfileDetailsChange = (e, field, skillIndexToDelete) => {
    field === "name" && setUpdatedProfileDetails(prev => ({ ...prev, user: { ...prev.user, name: e.target.value }}));
    field === "email" && setUpdatedProfileDetails(prev => ({ ...prev, user: { ...prev.user, email: e.target.value } }));
    field === "password" && setUpdatedProfileDetails(prev => ({ ...prev, user: { ...prev.user, password: e.target.value } }));
    field === "bio" && setUpdatedProfileDetails(prev => ({ ...prev, bio: e.target.value }));
    field === "github_url" && setUpdatedProfileDetails(prev => ({ ...prev, github_url: e.target.value }));
    field === "linkedin_url" && setUpdatedProfileDetails(prev => ({ ...prev, linkedin_url: e.target.value }));
    field === "facebook_url" && setUpdatedProfileDetails(prev => ({ ...prev, facebook_url: e.target.value }));
    field === "instagram_url" && setUpdatedProfileDetails(prev => ({ ...prev, instagram_url: e.target.value }));
    field === "twitter_url" && setUpdatedProfileDetails(prev => ({ ...prev, twitter_url: e.target.value }));
    field === "skill" && setUpdatedProfileDetails(prev => ({ ...prev, skill: e.target.value }));
    field === "add_skill" && setUpdatedProfileDetails(prev => ({ ...prev, skills: [...prev.skills, updatedProfileDetails.skill], skill: "" }));
    field === "delete_skill" && setUpdatedProfileDetails(prev => ({ ...prev, skills: prev.skills.filter((skill, index) => index !== skillIndexToDelete) }));
    field === "volunteer_status" && setUpdatedProfileDetails(prev => ({ ...prev, volunteer: !prev.volunteer }));
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
            {currentEditSection === "profile_links" && <EditLinks updatedProfileDetails={updatedProfileDetails} handleProfileDetailsChange={handleProfileDetailsChange} />}
            {currentEditSection === "skills" && <EditSkills updatedProfileDetails={updatedProfileDetails} handleProfileDetailsChange={handleProfileDetailsChange} />}
            {currentEditSection === "volunteer_status" && <EditVolunteerStatus updatedProfileDetails={updatedProfileDetails} handleProfileDetailsChange={handleProfileDetailsChange} />}
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

const EditLinks = (props) => {
  const { updatedProfileDetails, handleProfileDetailsChange } = props;
  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="github_url"
          label="Github URL"
          value={updatedProfileDetails.github_url}
          onChange={(event) => handleProfileDetailsChange(event, "github_url")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GitHubIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="linkedin_url"
          label="LinkedIn URL"
          value={updatedProfileDetails.linkedin_url}
          onChange={(event) => handleProfileDetailsChange(event, "linkedin_url")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkedInIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="facebook_url"
          label="Facebook URL"
          value={updatedProfileDetails.facebook_url}
          onChange={(event) => handleProfileDetailsChange(event, "facebook_url")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FacebookIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="instagram_url"
          label="Instagram URL"
          value={updatedProfileDetails.instagram_url}
          onChange={(event) => handleProfileDetailsChange(event, "instagram_url")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InstagramIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="twitter_url"
          label="Twitter URL"
          value={updatedProfileDetails.twitter_url}
          onChange={(event) => handleProfileDetailsChange(event, "twitter_url")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TwitterIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Grid>
    </>
  );
}

const EditSkills = (props) => {
  const { updatedProfileDetails, handleProfileDetailsChange } = props;
  return (
    <>
      <Grid item xs={12} sm={9}>
        <TextField
          fullWidth
          id="skill"
          label="Add skill"
          name="skill"
          autoComplete="skill"
          value={updatedProfileDetails.skill}
          onChange={(event) => handleProfileDetailsChange(event, "skill")}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={(event) => handleProfileDetailsChange(event, "add_skill")}
        >
          Add
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {
            Array.isArray(updatedProfileDetails.skills) && updatedProfileDetails.skills.map((data, index) => {
              return (
                <ListItem key={index}>
                  <Chip
                    label={data}
                    onDelete={(event) => handleProfileDetailsChange(event, "delete_skill", index)}
                  />
                </ListItem>
              );
            })
          }
        </Paper>
      </Grid>
    </>
  );
}

const EditVolunteerStatus = (props) => {
  const { updatedProfileDetails, handleProfileDetailsChange } = props;
  return (
    <>
      <FormControlLabel control={
        <Checkbox checked={updatedProfileDetails.volunteer} onChange={(event) => handleProfileDetailsChange(event, "volunteer_status")} />
      } label="Want to be Volunteer?" />
    </>
  );
}