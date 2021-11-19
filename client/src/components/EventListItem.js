import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function EventListItem(props) {
  const { _id, title, description, event_url } = props.event;
  return (
    <div className="item-container">
    <Grid container sx={{ border: 1, my: 2, p: 2 }}>
      <Grid item xs={3} > 
        <img src={event_url} width="150px" height="150px"/>
      </Grid>
      <Grid item xs={9} sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
        <Typography component="h5" variant="h5">
          <Link className="link" to={`/groups/${_id}`}>{title}</Link>
        </Typography>
        <Typography component="h6" variant="h6">{description}</Typography>
        <Button variant="contained">Join</Button>
      </Grid>
    </Grid>
    </div>
  )
}

export default EventListItem;