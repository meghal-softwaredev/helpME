import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogContent, DialogTitle, Avatar, Grid, Box, Typography, Container, Paper, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../actions/eventActions';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment'
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { updateEvent } from '../actions/eventActions';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.1),
}));

export default function NewEvent(props) {
  const [eventState, setEventState] = React.useState({
    title: "",
    description: "",
    // date: new Date(),
    // start_time: "",
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
  const navigate = useNavigate();
  // const categoryList = useSelector((state) => state.categoryList);
  // const { categories } = categoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!event) {
      dispatch(createEvent(eventState));
    } else {
      setEventState({
        title: event.title,
        description: event.description,
        // date: new Date(),
        // start_time: "",
        date_time: event.date_time,
        duration: event.duration,
        event_image_url: event.event_image_url,
        event_video_url: event.event_video_url,
        group_id: event.group_id,
        tags: event.tags
      })
    }
  }, []);
  // useEffect(() => {
  //   dispatch(listCategories());
  // }, [dispatch]);
  
  function handleTitleChange(e) {
    setEventState(prev => ({ ...prev, title: e.target.value }));
  };
  function handleDescriptionChange(e) {
    setEventState(prev => ({ ...prev, description: e.target.value }));
  };

  function handleDateChange(date) {
    setEventState(prev => ({ ...prev, date: date }));
  };

  function handleStartTimeChange(time) {
    setEventState(prev => ({ ...prev, start_time: time }));
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
  
  // function handleCategoryChange(e) {
  //   setGroupState(prev => ({ ...prev, category_id: e.target.value }));
  // };

  function handleEventVideoURLChange(e) {
    setEventState(prev => ({ ...prev, event_video_url: e.target.value }));
  };

  const handleAddTag = () => {
    setEventState(prev => ({ ...prev, tags: [...prev.tags, eventState.tag], tag: ""}));
  };

  const handleDeleteTag = (tagToDelete) => () => {
    setEventState(prev => ({ ...prev, tags: (tags) => tags.filter((tag) => tag !== tagToDelete)}));
  };

  function handleTagChange(e) {
    setEventState(prev => ({...prev, tag: e.target.value}));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventDetails) {
      dispatch(createEvent(eventState));
    } else {
      dispatch(updateEvent(props.eventId, eventState));
    }
    props.handleCloseNewEvent();
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
    navigate('/events');
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              {/* <PostAddIcon /> */}
            </Avatar>
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
                {/* <LocalizationProvider dateAdapter={DateAdapter}>
                  <DatePicker
                    required
                    fullWidth
                    format={'MM-DD-YYYY'}
                    value={moment(eventState.date, 'MM-DD-YYYY')}
                    label="Event Date"
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                 </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <TimePicker
                    required
                    value={eventState.start_time}
                    label="Start Time"
                    onChange={handleStartTimeChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                 </LocalizationProvider> */}
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
                          eventState.tags.map((data) => {
                          return (
                            <ListItem key={data}>
                              <Chip
                                label={data}
                                onDelete={handleDeleteTag(data)}
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
                sx={{ mt: 3, mb: 2 }}
              >
                Update Event
              </Button>) : (<Button
                type="submit"
                fullWidth
                variant="contained"
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