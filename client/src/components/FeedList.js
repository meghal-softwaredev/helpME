import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { listFeeds } from '../actions/feedActions';
import FeedListItem from './FeedListItem';
import NewFeed from './NewFeed';

function FeedList(props) {
  const [openNewFeed, setOpenNewFeed] = React.useState(false);

  const navigate = useNavigate();

  const feedList = useSelector((state) => state.feedList);
  const { loading, error, feeds } = feedList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch( listFeeds() );
  }, [dispatch, openNewFeed, navigate, props.history ]);

  const handleOpenNewFeed = () => {
    setOpenNewFeed(true);
  };

  const handleCloseNewFeed = () => {
    setOpenNewFeed(false);
  };

  return (
    <div>
      {userInfo && (
        <div>
          <Button size="large" variant="contained" onClick={handleOpenNewFeed}>
            Post Question
          </Button>
          <NewFeed activity="new" openNewFeed={openNewFeed} handleCloseNewFeed={handleCloseNewFeed} />
        </div>
      )}
      {loading ? (
        <span>Loading</span>
      ) : error ? (
        <span>Error: {error}</span>
      ) : (
        <>
          {feeds.map((feed) => (
            <FeedListItem key={feed._id} feed={feed} />
          ))}
        </>
      )}
    </div>
  );
}

export default FeedList
