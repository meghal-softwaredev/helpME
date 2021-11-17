import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function EventListItem(props) {
  const { _id, title, description, event_url } = props.event;
  return (
    <div>
      <div className="item-container">
      <Box sx={{ border: 1, my: 2, p: 2 }}>
        <Box sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
          <img src={event_url} width="200px" height="200px"/>
          <Link className="link" to={`/groups/${_id}`}>{title}</Link>
          <p>{description}</p>
        </Box>
      </Box>
    </div>
    </div>
  )
}

export default EventListItem;