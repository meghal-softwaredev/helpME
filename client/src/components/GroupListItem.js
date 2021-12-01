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
  const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

  const [anchorEl, setAnchorEl] = useState(null);
  const { _id, title, description, group_url, group_favourites } = props.group;
  const [groupFavourite, setGroupFavourite] = useState(group_favourites);
  const [followers, setFollowers] = useState(props.group.followers);
  
  const dispatch = useDispatch();

  const handleJoinGroup = (groupId) => {
    Axios.put(`/api/groups/${groupId}/join`, { 
      user_id: userInfo._id }, 
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }).then((res) => {
       setFollowers(res.data.group.followers);
      })
  }

  const handleShareGroup = (group) => {
    setAnchorEl(group.currentTarget);
    const url = window.location.href + "/" + _id;
    navigator.clipboard.writeText(url);
  }

  const handleLikeGroup = (groupId) => {
    if(groupFavourite) {
      setGroupFavourite((prev) => [...prev, userInfo._id])
      Axios.put(`/api/groups/${groupId}/addFavourite`, { 
        favourites: groupFavourite 
      }, 
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
    }
  }

  const handleUnLikeGroup = (groupId) => {
    const groupFav = groupFavourite.filter((item)=> item !== userInfo._id);
    setGroupFavourite(groupFav);
    Axios.put(`/api/groups/${groupId}/deleteFavourite`, { 
      favourites: groupFav 
    }, 
    {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
  }

  const open = Boolean(anchorEl);

  return (
    <div className="item-container" style={{ color: "white" }}>
    <Grid container sx={{ my: 2, p: 2 }}>
      <Grid item xs={2} > 
          <img src={group_url} width="180px" height="180px" alt="Group" style={{  borderRadius: "200px", border: "1px solid #adb5bd"}}/>
      </Grid>
      <Grid item xs={10} sx={{ fontSize: 'h5.fontSize', fontWeight: 'medium', mb: 2 }}>
        <Typography component="h5" variant="h5">
          <Link className="link" to={`/groups/${_id}`}>{title}</Link>
        </Typography>
        <Typography component="h6" variant="h6">{description.slice(0, 220)+'...'}</Typography>
        <Grid container sx={{mt: 3}} alignItems="center">
          <Grid item xs={6}>
          {userInfo && (
          <Button variant="outlined" sx={{color:"white"}} onClick={() => handleJoinGroup(_id)}>Join</Button>
          )}
          </Grid>
          <Grid item xs={2} justifyContent="flex-end">
          <Typography component="h6" variant="h6">{followers && followers.length} followers</Typography>
          </Grid>
          <Grid item xs={1} justifyContent="flex-end">
              {userInfo && (
              <div>
              <IconButton size="large" variant="outlined" onClick={(e) => handleShareGroup(e)}>
                    <IosShareIcon sx={{ fontSize: "30px" }} color="white" />
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
              { (Array.isArray(groupFavourite) && groupFavourite.includes(userInfo._id)) ? (
                <IconButton size="large" variant="outlined" onClick={() => handleUnLikeGroup(_id)}>
                  <FavoriteIcon sx={{ fontSize: "30px", color: "#da5552" }}/>
                </IconButton>
              ):(
                <IconButton size="large" variant="outlined" onClick={() => handleLikeGroup(_id)}>
                  <FavoriteBorderIcon sx={{ fontSize: "30px", color: "white" }} />
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
  );
}

export default GroupListItem;