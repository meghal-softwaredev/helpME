import { Chip, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import "./FeedListItem.scss";
function GroupListItem(props) {
  return (
    <div>
      <div className="feed-item-container">
      <Box sx={{ border: 1, my: 2, p: 2 }}>
        <Box sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
          <Link className="link" to={`/groups/${props.group._id}`}>{props.group.title}</Link>
        </Box>
      </Box>
    </div>
    </div>
  )
}

export default GroupListItem;