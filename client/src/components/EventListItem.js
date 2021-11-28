import { useState } from 'react';
import { Button, Popover } from '@mui/material';
import { Link } from 'react-router-dom';
import { Grid, Typography, Divider, IconButton} from '@mui/material';
import Axios from 'axios';
import moment from 'moment';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function EventListItem(props) {
  const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

  const [anchorEl, setAnchorEl] = useState(null);
  const { _id, title, description, date_time, event_image_url, attendees,event_favourites } = props.event;

  const [eventFavourite, setEventFavourite] = useState(event_favourites);
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
    if(eventFavourite) {
      setEventFavourite((prev) => [...prev, userInfo._id])
      
      Axios.put(`/api/events/${eventId}/addFavourite`, { 
        favourites: eventFavourite 
      }, 
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
    }
  }

  const handleUnLikeEvent = (eventId) => {
    if (eventFavourite) {
      const eventFav = eventFavourite.filter((item)=> item !== userInfo._id);
      setEventFavourite(eventFav);
      Axios.put(`/api/events/${eventId}/deleteFavourite`, { 
        favourites: eventFav 
      }, 
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
    }
  }

  const open = Boolean(anchorEl);
  return (
    <div className="item-container">
    <Grid container sx={{ my: 2, p: 2 }}>
      <Grid item xs={2} > 
        <img src={event_image_url} width="130px" height="130px" alt="Event" style={{borderRadius: 50}}/>
      </Grid>
      <Grid item xs={10} sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
        <Typography component="h5" variant="h5">
          <Link className="link" to={`/events/${_id}`}>{title}</Link>
        </Typography>
        <Typography component="h6" variant="h6">
          {moment(date_time).format('llll')}
        </Typography>
        <Typography component="h6" variant="h6">{description.slice(0, 220)+'...'}</Typography>
        <Grid container sx={{mt: 3}}>
          <Grid item xs={6}>
          {userInfo && (
          <Button variant="outlined" sx={{color:"white"}} onClick={() => handleAttendEvent(_id)}>Attend</Button>
          )}
          </Grid>
          <Grid item xs={2} justifyContent="flex-end">
          <Typography component="h6" variant="h6">{attendees && attendees.length} attendees</Typography>
          </Grid>
          <Grid item xs={1} justifyContent="flex-end">
              {userInfo && (
              <div>
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
            </div>
            )}
            </Grid>
            <Grid item xs={1} justifyContent="flex-end">
              {userInfo && (
              <div>
              { (Array.isArray(eventFavourite) && eventFavourite.includes(userInfo._id)) ? (
                <IconButton size="small" variant="outlined" onClick={() => handleUnLikeEvent(_id)}>
                  <FavoriteIcon color="red"/>
                </IconButton>
              ):(
                <IconButton size="small" variant="outlined" onClick={() => handleLikeEvent(_id)}>
                  <FavoriteBorderIcon color="white"/>
                </IconButton>
                )} 
                </div>
              )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Divider />
    </div>
  )
}

export default EventListItem;