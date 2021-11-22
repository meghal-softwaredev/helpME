import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { listEvents } from '../actions/eventActions';
import EventListItem from './EventListItem';
import { Button } from '@mui/material';

function EventList(props) {
  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch, listEvents, navigate]);
  
  const handleGroup = () => {
    navigate('/groups');
  }

  return (
    <div>
      <div>
        <Button size="large" variant="outlined" sx={{mr: 2, color:"white"}}>
          Event
        </Button>
        <Button size="large" variant="outlined" sx={{color:"white"}} onClick={handleGroup}>
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
