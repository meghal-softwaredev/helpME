import { Chip, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import "../styles/components/FeedListItem.scss";
function FeedListItem(props) {
  return (
    <div className="feed-item-container">
      <Box sx={{ my: 1, p: 2, display: 'flex', gap: '10px', alignItems: "center" }}>
        <Box sx={{ flex: '1' }}>
          <Box sx={{ fontSize: 'h5.fontSize', flex: '1', fontWeight: 'medium', mb: 1 }}>
            <Link className="link" to={`/feeds/${props.feed._id}`}>{props.feed.title}</Link>
          </Box>
          <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <Box>
              {props.feed.tags.map(tag => (
                <Chip key={tag} sx={{ mr: 1 }} label={tag} color="primary" variant="outlined" size="small" />
              ))}
            </Box>
            <Typography sx={{ fontSize: '13px' }}>{moment(props.feed.createdAt).format("MMMM Do, YYYY")}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 'h6.fontSize', fontWeight: 'bold' }}>10</Typography>
          <Typography>Answers</Typography>
        </Box>
      </Box>
    </div>
  )
}

export default FeedListItem
