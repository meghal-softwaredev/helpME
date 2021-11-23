import { useState } from 'react';
import { Button, Popover } from '@mui/material';
import { Link } from 'react-router-dom';
import { Grid, Typography, Divider, IconButton} from '@mui/material';
import { useDispatch } from 'react-redux';
import { joinGroup } from '../actions/groupActions';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Axios from 'axios';

function GroupListItem(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const { _id, title, description, group_url, favourites } = props.group;
  
  const dispatch = useDispatch();
  const handleJoinGroup = (groupId) => {
    dispatch(joinGroup(groupId));
  }

  const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
  
  const handleShareGroup = (event) => {
    setAnchorEl(event.currentTarget);
    const url = window.location.href + "/" + _id;
    navigator.clipboard.writeText(url);
  }

  const handleLikeGroup = (groupId) => {
    Axios.put(`/api/groups/${groupId}/favourite`, { 
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
        <img src={group_url} width="130px" height="130px" alt="Group" style={{borderRadius: 50}}/>
      </Grid>
      <Grid item xs={8} sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
        <Typography component="h5" variant="h5">
          <Link className="link" to={`/groups/${_id}`}>{title}</Link>
        </Typography>
        <Typography component="h6" variant="h6">{description}</Typography>
        {userInfo && (
        <Button variant="outlined" sx={{color:"white"}} onClick={() => handleJoinGroup(_id)} >Join</Button>
        )}
      </Grid>
      {userInfo && (
      <Grid item xs={1} >
        <IconButton size="small" variant="outlined" onClick={(event) => handleShareGroup(event)}>
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
        { favourites && favourites[userInfo._id] === true ? (
        <IconButton size="small" variant="outlined" onClick={() => handleLikeGroup(_id)}>
          <FavoriteIcon color="red"/>
        </IconButton>
        ) : (
        <IconButton size="small" variant="outlined" onClick={() => handleLikeGroup(_id)}>
          <FavoriteBorderIcon color="white"/>
        </IconButton>
        )}
      </Grid>
      )}
    </Grid>
    <Divider />
    </div>
  );
}

export default GroupListItem;