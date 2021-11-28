import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { Grid, Button, Typography, IconButton, Box } from '@mui/material';
import { getIndividualEvent, deleteEvent } from '../actions/eventActions';
import NewEvent from './NewEvent';
import ConfirmDialog from './ConfirmDialog';
import Axios from 'axios';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import YoutubeEmbed from './YoutubeEmbed';
         
function IndividualEvent(props) {
  const [openNewEvent, setOpenNewEvent] = useState(false);
  const [openDeleteEvent, setOpenDeleteEvent] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const individualEventDetails = useSelector((state) => state.individualEventDetails);
  const { loading, error, event } = individualEventDetails;

  // const getVideoId = () => {
  //   let videoId;
  //   if (event) {
  //     videoId = event.event_video_url.split('=')[1];
  //     console.log(videoId);
  //   }
  //   return videoId;
  // }

  const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

  const handleAttendEvent = (eventId) => {
    Axios.put(`/api/events/${eventId}/attend`, { 
      user_id: userInfo._id }, 
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
  }

  const handleLikeEvent = (eventId) => {
    Axios.put(`/api/events/${eventId}/favourite`, { 
      user_id: userInfo._id }, 
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
  }
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIndividualEvent(id));
  }, [dispatch, id]);

  const deleteEventHandler = () => {
    dispatch(deleteEvent(id));
    navigate("/events");
  }
 
  const handleOpenNewEvent = () => {
    setOpenNewEvent(true);
  };

  const handleCloseNewEvent = () => {
    setOpenNewEvent(false);
  };

  const handleOpenDeleteEvent = () => {
    setOpenDeleteEvent(true);
  };

  const handleCloseDeleteEvent = () => {
    setOpenDeleteEvent(false);
  };

  return (
    <Box sx={{flex:1, display:"flex", flexDirection:"column", justifyContent:"start", ml: 4}}>
    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <Box>
        <Typography component="h4" variant="h4">
          {event.title}
        </Typography>
        <br />
        <Grid container sx={{ p: 2}}>
          <Grid item xs={4} sx={{mr: 7}}>
          <YoutubeEmbed embedId="FgnxcUQ5vho" />
          {/* <video width="320" height="240" controls>
            <source src="https://vimeo.com/639318053/e327486145" type="video/mp4" />
          Your browser does not support the video tag.
          </video> */}
          {/* https://vimeo.com/639318053/e327486145 */}
          </Grid>
          <Grid item xs={7} sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
            <Grid container justify-content="space-between">
              <Grid item sx={5} sx={{mr: 10}}>
                <Typography component="h6" variant="h6">
                  {moment(event.date_time).format('llll')}
                </Typography>
                <Typography component="h6" variant="h6">
                  {event.duration +` mins` }
                </Typography>
              </Grid>
              <Grid item sx={1} sx={{mr: 1}}>
              {userInfo && userInfo._id === event.user_id && (
                <div>
                <IconButton size="small" variant="outlined" onClick={handleOpenNewEvent}>
                  <ModeEditIcon />
                </IconButton>
                <NewEvent openNewEvent={openNewEvent} handleCloseNewEvent={handleCloseNewEvent} edit={true} eventId={id} event={event}/>
                </div>
              )}
                </Grid>
                <Grid item sx={1} >
                {userInfo && userInfo._id === event.user_id && (
                  <div>
                <IconButton size="small" variant="outlined" onClick={handleOpenDeleteEvent}>
                  <DeleteIcon />
                </IconButton>
                <ConfirmDialog
                  title="Delete Event?"
                  openDelete={openDeleteEvent}
                  handleCloseDelete={handleCloseDeleteEvent}
                  onConfirm={deleteEventHandler}
                >
                  Are you sure you want to delete this event?
                </ConfirmDialog>
                </div>
                )}
              </Grid>
            </Grid>
            <br/>
            {userInfo && (
             <Button variant="outlined" sx={{color:"white"}} onClick={() => handleAttendEvent(id)}>Attend</Button>
            )}
          </Grid>
        </Grid>
        <br />
        <Box>
          <Typography component="h6" variant="h6">{event.description}</Typography>
        </Box>
        </Box>
    )} 
    </Box>
  );
}

export default IndividualEvent;