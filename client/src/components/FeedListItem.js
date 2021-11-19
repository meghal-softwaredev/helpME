import { Chip, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import "../styles/components/FeedListItem.scss";
function FeedListItem(props) {
  return (
    <div className="feed-item-container">
      <Box sx={{ border: 1, my: 2, p: 2 }}>
        <Box sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
          <Link className="link" to={`/feeds/${props.feed._id}`}>{props.feed.title}</Link>
        </Box>
        {props.feed.tags.map(tag => (
          <Chip key={tag} sx={{ mr: 1 }} label={tag} color="primary" />
        ))}
      </Box>
    </div>
  )
}

export default FeedListItem
