import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { Grid, Button, Typography } from '@mui/material';
import { getIndividualGroup } from '../actions/groupActions';
import NewGroup from './NewGroup';
import ConfirmDialog from './ConfirmDialog';
import { deleteGroup } from '../actions/groupActions';
import NewEvent from './NewEvent';

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
        <Button size="small" variant="contained" onClick={handleOpenNewEvent}>
            Create Event
          </Button>
          <NewEvent openNewEvent={openNewEvent} handleCloseNewEvent={handleCloseNewEvent} group_id ={group._id}/>
        </div>
      <div>
        <Grid container sx={{ border: 1,  p: 2 }}>
          <Grid item xs={3} > 
          <img src={group.group_url} width="150px" height="150px" alt="Group"/>
          </Grid>
          <Grid item xs={9} sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
            <Grid container>
              <Grid item>
                <Typography component="h5" variant="h5">
                  {group.title}
                </Typography>
              </Grid>
             <Grid item >
                <Button size="small" variant="contained" onClick={handleOpenNewGroup}>
                  Edit
                </Button>
                <NewGroup openNewGroup={openNewGroup} handleCloseNewGroup={handleCloseNewGroup} edit={true} groupId={id}/>
                <Button size="small" variant="contained" onClick={handleOpenDeleteGroup}>
                  Delete
                </Button>
                <ConfirmDialog
                  title="Delete Group?"
                  openDeleteGroup={openDeleteGroup}
                  handleCloseDeleteGroup={handleCloseDeleteGroup}
                  onConfirm={deleteGroupHandler}
                >
                  Are you sure you want to delete this group?
                </ConfirmDialog>
              </Grid>
            </Grid>
            <Typography component="h6" variant="h6">{group.description}</Typography>
            <Button variant="contained">Join</Button>
          </Grid>
        </Grid>
       </div>
       </div>
    )} 
    </div>
  );
}

export default IndividualGroup;