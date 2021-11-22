import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { Grid, Button, Typography, IconButton } from '@mui/material';
import { getIndividualGroup } from '../actions/groupActions';
import NewGroup from './NewGroup';
import ConfirmDialog from './ConfirmDialog';
import { deleteGroup } from '../actions/groupActions';
import NewEvent from './NewEvent';
import { joinGroup } from '../actions/groupActions';
import IosShareIcon from '@mui/icons-material/IosShare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

function IndividualGroup(props) {
  const [openNewGroup, setOpenNewGroup] = useState(false);
  const [openDeleteGroup, setOpenDeleteGroup] = useState(false);
  const [openNewEvent, setOpenNewEvent] = useState(false);

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
 
  const handleOpenNewGroup = () => {
    setOpenNewGroup(true);
  };

  const handleCloseNewGroup = () => {
    setOpenNewGroup(false);
  };

  const handleOpenDeleteGroup = () => {
    setOpenDeleteGroup(true);
  };

  const handleCloseDeleteGroup = () => {
    setOpenDeleteGroup(false);
    
  };

  const handleOpenNewEvent = () => {
    setOpenNewEvent(true);
  };

  const handleCloseNewEvent = () => {
    setOpenNewEvent(false);
  };

  return (
    <div className="item-container">
    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <div>
        <div>
          <Button size="small" variant="outlined" sx={{color:"white"}} onClick={handleOpenNewEvent}>
              Create Event
          </Button>
          <NewEvent openNewEvent={openNewEvent} handleCloseNewEvent={handleCloseNewEvent} group_id ={group._id}/>
        </div>
        <div>
        <Grid container sx={{ p: 2 }}>
          <Grid item xs={3} > 
            <img src={group.group_url} width="150px" height="150px" alt="Group" style={{borderRadius: 50}}/>
          </Grid>
          <Grid item xs={7} sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
            <Typography component="h5" variant="h5">{group.title}</Typography>
            <Typography component="h6" variant="h6">{group.description}</Typography>
            <Button variant="outlined" sx={{color:"white"}} onClick={() => handleJoinGroup(id)}>Join</Button>
          </Grid>
          <Grid item xs={2} >
            <div style={{mr:1}}>
              <IconButton size="small" variant="outlined" onClick={handleOpenNewGroup}>
                <ModeEditIcon />
              </IconButton>
              <NewGroup openNewGroup={openNewGroup} handleCloseNewGroup={handleCloseNewGroup} edit={true} groupId={id}/>
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
            <br />
            <br />
            <div >
              <IosShareIcon />
              <FavoriteBorderIcon />
            </div>
          </Grid>
        </Grid>
       </div>
      </div>
    )} 
  </div>
  );
}

export default IndividualGroup;