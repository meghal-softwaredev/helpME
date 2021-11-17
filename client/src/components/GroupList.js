import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listGroups } from '../actions/groupActions';
import GroupListItem from './GroupListItem';

function GroupList(props) {
  const groupList = useSelector((state) => state.groupList);
  const { loading, error, groups } = groupList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listGroups());
  }, [dispatch]);

  return (
    <div>
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
