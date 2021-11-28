import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { Grid, Button, Typography, IconButton, Box, Popover } from '@mui/material';
import { getIndividualGroup } from '../actions/groupActions';
import NewGroup from './NewGroup';
import NewEvent from './NewEvent';
import ConfirmDialog from './ConfirmDialog';
import { deleteGroup } from '../actions/groupActions';
import { joinGroup } from '../actions/groupActions';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Axios from 'axios';
import "../styles/elements/link.scss";

function IndividualGroup(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openNewGroup, setOpenNewGroup] = useState(false);
  const [openNewEvent, setOpenNewEvent] = useState(false);
  const [openDeleteGroup, setOpenDeleteGroup] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const individualGroupDetails = useSelector((state) => state.individualGroupDetails);
  const { loading, error, group } = individualGroupDetails;
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIndividualGroup(id));
  }, [dispatch, id]);

  const handleJoinGroup = (groupId) => {
    dispatch(joinGroup(groupId));
  }

  const deleteGroupHandler = () => {
    dispatch(deleteGroup(id));
    navigate("/groups");
  }
 
  const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

  const handleOpenNewGroup = () => {
    setOpenNewGroup(true);
  };

  const handleCloseNewGroup = () => {
    setOpenNewGroup(false);
  };

  const handleOpenNewEvent = () => {
    setOpenNewEvent(true);
  };

  const handleCloseNewEvent = () => {
    setOpenNewEvent(false);
  };

  const handleOpenDeleteGroup = () => {
    setOpenDeleteGroup(true);
  };

  const handleCloseDeleteGroup = () => {
    setOpenDeleteGroup(false);
  };

  const handleChat = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const open = Boolean(anchorEl);
  return (
    <Box sx={{flex:1, display:"flex", flexDirection:"column", justifyContent:"start"}}>
    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <div>
        <Grid container justifyContent="space-between" sx={{ml: 4}}>
          <Grid item sx={8}>
            <Typography component="h5" variant="h5">{group.title}</Typography>
          </Grid>
          <Grid item sx={{mr: 20}} >
            {userInfo && userInfo._id === group.user_id &&  (
              <div>
                <Button size="large" variant="outlined" sx={{color:"white"}} onClick={handleOpenNewEvent}>
                    Create Event
                </Button>
                <NewEvent openNewEvent={openNewEvent} handleCloseNewEvent={handleCloseNewEvent} group_id ={group._id}/>
              </div>
            )}
          </Grid>
        </Grid>
        <br />
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={3} sx={{mr: 4}}> 
            <img src={group.group_url} width="300px" height="200px" alt="Group" style={{borderRadius: 50}}/>
          </Grid>
          <Grid item xs={8} sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
            <Typography component="h6" variant="h6">{group.description}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ml: 4}}>
          <Grid item={2} sx={{mr: 4}}>
            {userInfo && (
                <Button size="large" variant="outlined" sx={{color:"white"}} onClick={() => handleJoinGroup(id)}>Join</Button>
            )}
            </Grid>
            <Grid item={1} sx={{mr: 2}}>
              {userInfo && userInfo._id === group.user_id && (
              <div>
                <IconButton size="small" variant="outlined" onClick={handleOpenNewGroup}>
                  <ModeEditIcon />
                </IconButton>
                <NewGroup openNewGroup={openNewGroup} handleCloseNewGroup={handleCloseNewGroup} edit={true} groupId={id}/>
              </div>
              )}
              </Grid>
              <Grid item={1}>
              {userInfo && userInfo._id === group.user_id && (
              <div>
                <IconButton size="small" variant="outlined" onClick={handleOpenDeleteGroup}>
                  <DeleteIcon />
                </IconButton>
                <ConfirmDialog
                  title="Delete Group?"
                  openDelete={openDeleteGroup}
                  handleCloseDelete={handleCloseDeleteGroup}
                  onConfirm={deleteGroupHandler}>
                  Are you sure you want to delete this group?
                </ConfirmDialog>
                </div>
                )}
              </Grid>
        <Button size="small" variant="outlined" onClick={(e) => handleChat(e)}>
          <Link className="link nav-link" to="/chat">Chat</Link>
        </Button>
        <Popover
        anchorEl={anchorEl}
        open={open}
        id={open ? "simple-popover" : undefined}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
      </Popover>
      </Grid>
      </div>
    )} 
  </Box>
  );
}

export default IndividualGroup;