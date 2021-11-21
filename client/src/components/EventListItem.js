import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Axios from 'axios';

function EventListItem(props) {
  const { _id, title, description, event_image_url } = props.event;

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

  return (
    <div className="item-container">
    <Grid container sx={{ border: 1, my: 2, p: 2 }}>
      <Grid item xs={3} > 
        <img src={event_image_url} width="150px" height="150px" alt="Event"/>
      </Grid>
      <Grid item xs={9} sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
        <Typography component="h5" variant="h5">
          <Link className="link" to={`/events/${_id}`}>{title}</Link>
        </Typography>
        <Typography component="h6" variant="h6">{description}</Typography>
        <Button variant="contained" onClick={() => handleAttendEvent(_id)}>Attend</Button>
      </Grid>
    </Grid>
    </div>
  )
}

export default EventListItem;