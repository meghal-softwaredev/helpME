import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function GroupListItem(props) {
  const { _id, title, description, group_url } = props.group;
  return (
    <div className="item-container">
    <Grid container sx={{ border: 1, my: 2, p: 2 }}>
      <Grid item xs={3} > 
        <img src={group_url} width="150px" height="150px" alt="Group"/>
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
  );
}

export default GroupListItem;