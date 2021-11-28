import React, { useEffect } from 'react';
import { Button, TextField, Dialog, DialogContent, DialogTitle, Grid, Box, Typography, Container, Paper, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, listEvents } from '../actions/eventActions';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment'
import DateTimePicker from '@mui/lab/DateTimePicker';
import { updateEvent } from '../actions/eventActions';
import EventSharpIcon from '@mui/icons-material/EventSharp';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.1),
}));

export default function NewEvent(props) {
  const [eventState, setEventState] = React.useState({
    title: "",
    description: "",
    date_time: new Date(),
    duration: "",
    event_image_url: "",
    event_video_url: "",
    tag: "",
    tags: [],
    group_id: props.group_id
  });

  const individualEventDetails = useSelector((state) => state.individualEventDetails);
  let { event } = individualEventDetails;

  const eventDetails = event;
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.edit) {
      setEventState({
        title: event.title,
        description: event.description,
        date_time: event.date_time,
        duration: event.duration,
        event_image_url: event.event_image_url,
        event_video_url: event.event_video_url,
        group_id: event.group_id,
        tags: event.tags
      })
    }
  }, []);

  function handleTitleChange(e) {
    setEventState(prev => ({ ...prev, title: e.target.value }));
  };
  function handleDescriptionChange(e) {
    setEventState(prev => ({ ...prev, description: e.target.value }));
  };

  function handleDateTimeChange(date_time) {
    setEventState(prev => ({ ...prev, date_time: date_time }));
  };

  function handleDurationChange(e) {
    setEventState(prev => ({ ...prev, duration: e.target.value }));
  };

  function handleEventImageURLChange(e) {
    setEventState(prev => ({ ...prev, event_image_url: e.target.value }));
  };

  function handleEventVideoURLChange(e) {
    setEventState(prev => ({ ...prev, event_video_url: e.target.value }));
  };

  const handleAddTag = () => {
    setEventState(prev => ({ ...prev, tags: [...prev.tags, eventState.tag], tag: ""}));
  };

  const handleDeleteTag = (tagIndexToDelete) => () => {
    setEventState(prev => ({ ...prev, tags: prev.tags.filter((tag, index) => index !== tagIndexToDelete)}));
  };

  function handleTagChange(e) {
    setEventState(prev => ({...prev, tag: e.target.value}));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventDetails) {
      dispatch(createEvent(eventState));
      dispatch(listEvents({}));
    } else {
      dispatch(updateEvent(props.eventId, eventState));
    }
    setEventState(prev => ({
      ...prev, title: "",
      description: "",
      date: "",
      start_time: "",
      duration: "",
      event_image_url: "",
      event_url: "",
      tag: "",
      tags: [],
      group_id: ""
    }));
    props.handleCloseNewEvent();
  };

  return (
    <Dialog open={props.openNewEvent} onClose={props.handleCloseNewEvent}>
        <DialogTitle>
        </DialogTitle>
        <DialogContent>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <EventSharpIcon color="primary" fontSize="large"/>
            {(props.edit) ? (
              <Typography component="h1" variant="h5">
                Update Event
              </Typography>) : (
              <Typography component="h1" variant="h5">
                Create Event
              </Typography>
             )}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    value={eventState.title}
                    onChange={handleTitleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    placeholder="Description"
                    multiline
                    rows={4}
                    value={eventState.description}
                    onChange={handleDescriptionChange}
                  />
                </Grid>
                <Grid item xs={12}>
                 <LocalizationProvider dateAdapter={DateAdapter}>
                  <DateTimePicker
                    required
                    value={eventState.date_time}
                    label="Date/Time of Event"
                    onChange={handleDateTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                 </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="duration"
                    label="Duration in mins"
                    placeholder="Duration in mins"
                    value={eventState.duration}
                    onChange={handleDurationChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="eventURL"
                    label="Event Image URL"
                    placeholder="Event Image URL"
                    value={eventState.event_image_url}
                    onChange={handleEventImageURLChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="eventVideoURL"
                    label="Event Video URL"
                    placeholder="Event Video URL"
                    value={eventState.event_video_url}
                    onChange={handleEventVideoURLChange}
                  />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextField
                      fullWidth
                      id="tag"
                      label="Add Tag"
                      name="tag"
                      autoComplete="tag"
                      value={eventState.tag}
                      onChange={handleTagChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      sx={{ mt: 1 }}
                      onClick={handleAddTag}
                    >
                      Add
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0.5,
                        m: 0,
                      }}
                      component="ul"
                    >
                      {
                          Array.isArray(eventState.tags) && eventState.tags.map((data, index)  => {
                          return (
                            <ListItem key={data}>
                              <Chip
                                label={data}
                                onDelete={handleDeleteTag(index)}
                              />
                            </ListItem>
                          );
                        })
                      }
                    </Paper>
                  </Grid>
              </Grid>
              {props.edit ? (<Button
                type="submit"
                fullWidth
                variant="contained"
                // onClick={() => window.location.reload(false)}
                sx={{ mt: 3, mb: 2 }}
              >
                Update Event
              </Button>) : (<Button
                type="submit"
                fullWidth
                variant="contained"
                // onClick={() => window.location.reload(false)}
                sx={{ mt: 3, mb: 2 }}
              >
                Create Event
              </Button>
              )}
            </Box>
          </Box>
        </Container>
        </DialogContent>
      </Dialog>
  );
}