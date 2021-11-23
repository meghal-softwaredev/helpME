import { useState } from 'react';
import { Button, Popover } from '@mui/material';
import { Link } from 'react-router-dom';
import { Grid, Typography, Divider, IconButton} from '@mui/material';
import Axios from 'axios';
import moment from 'moment';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function EventListItem(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { _id, title, description, date_time, event_image_url } = props.event;

  const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

  const handleAttendEvent = (eventId) => {
    Axios.put(`/api/events/${eventId}/attend`, { 
      user_id: userInfo._id }, 
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
  }
  
  const handleShareEvent = (e) => {
    setAnchorEl(e.currentTarget);
    const url = window.location.href + "/" + _id;
    navigator.clipboard.writeText(url);
  }

  const handleLikeEvent = (eventId) => {
    Axios.put(`/api/events/${eventId}/favourite`, { 
      user_id: userInfo._id }, 
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
  }
  const open = Boolean(anchorEl);
  return (
    <div className="item-container">
    <Grid container sx={{ my: 2, p: 2 }}>
      <Grid item xs={3} > 
        <img src={event_image_url} width="130px" height="130px" alt="Event" style={{borderRadius: 50}}/>
      </Grid>
      <Grid item xs={8} sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
        <Typography component="h5" variant="h5">
          <Link className="link" to={`/events/${_id}`}>{title}</Link>
        </Typography>
        <Typography component="h6" variant="h6">
          {moment(date_time).format('llll')}
        </Typography>
        <Typography component="h6" variant="h6">{description}</Typography>
        {userInfo && (
        <Button variant="outlined" sx={{color:"white"}} onClick={() => handleAttendEvent(_id)}>Attend</Button>
        )}
      </Grid>
      {userInfo && (
      <Grid item xs={1} >
        <IconButton size="small" variant="outlined" onClick={(e) => handleShareEvent(e)}>
          <IosShareIcon color="white" />
        </IconButton>
        <Popover
        anchorEl={anchorEl}
        open={open}
        id={open ? "simple-popover" : undefined}
        onClose={() => {
          setAnchorEl(null);
        }}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
      >
        Copied Link
      </Popover>
        {/* <IconButton size="small" variant="outlined" onClick={() => handleLikeEvent(_id)}>
          <FavoriteBorderIcon color="white"/>
        </IconButton> */}
      </Grid>
      )}
    </Grid>
    <Divider />
    </div>
  )
}

export default EventListItem;