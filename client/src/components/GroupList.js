import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function GroupList(props) {
  const GroupList = useSelector((state) => state.groupList);
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
