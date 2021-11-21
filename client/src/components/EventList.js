import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { listEvents } from '../actions/eventActions';
import EventListItem from './EventListItem';
import { Button } from '@mui/material';

function EventList(props) {
  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch, listEvents]);
  
  const navigate = useNavigate();
  const handleGroup = () => {
    navigate('/groups');
  }

  return (
    <div>
      <div>
        <Button size="large" variant="contained" sx={{mr: 2}}>
          Event
        </Button>
        <Button size="large" variant="contained" onClick={handleGroup}>
          Group
        </Button>
      </div>
      {loading ? (
        <span>Loading</span>
      ) : error ? (
        <span>Error: {error}</span>
      ) : (
        <>
          {events.map((event) => (
            <EventListItem key={event._id} event={event} />
          ))}
        </>
      )}
    </div>
  );
}

export default EventList;
