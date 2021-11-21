import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from "../mui/themes";
import { Button, Box, Divider } from '@mui/material';
import { listFeeds } from '../actions/feedActions';
import FeedListItem from './FeedListItem';
import NewFeed from './NewFeed';

function FeedList(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const feedList = useSelector((state) => state.feedList);
  const { loading, error, feeds } = feedList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch( listFeeds() );
  }, [dispatch, location]);


  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ border: '1px solid #0077b6', my: 2, px: 2 }}>
        {loading ? (
          <span>Loading</span>
        ) : error ? (
          <span>Error: {error}</span>
        ) : (
          <>
            {feeds.map((feed) => (
              <React.Fragment key= { feed._id }>
                <FeedListItem feed={feed} />
                <Divider />
              </React.Fragment>
            ))}
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default FeedList
