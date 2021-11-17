import { Chip, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function GroupListItem(props) {
  const { _id, title, description, group_url } = props.group;
  return (
    <div>
      <div className="item-container">
      <Box sx={{ border: 1, my: 2, p: 2 }}>
        <Box sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
          <img src={group_url} width="200px" height="200px"/>
          <Link className="link" to={`/groups/${_id}`}>{title}</Link>
          <p>{description}</p>
        </Box>
      </Box>
    </div>
    </div>
  )
}

export default GroupListItem;