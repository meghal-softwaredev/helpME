import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { listGroups } from '../actions/groupActions';
import GroupListItem from './GroupListItem';
import { Button } from '@mui/material';

function GroupList(props) {
  const groupList = useSelector((state) => state.groupList);
  const { loading, error, groups } = groupList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listGroups());
  }, [dispatch]);
  
  const navigate = useNavigate();
  const handleEvent = () => {
    navigate('/events');
  }

  return (
    <div>
      <div>
        <Button size="large" variant="contained" onClick={handleEvent}>
          Event
        </Button>
        <Button size="large" variant="contained">
          Group
        </Button>
      </div>
      {loading ? (
        <span>Loading</span>
      ) : error ? (
        <span>Error: {error}</span>
      ) : (
        <>
          {groups.map((group) => (
            <GroupListItem key={group._id} group={group} />
          ))}
        </>
      )}
    </div>
  );
}

export default GroupList;
