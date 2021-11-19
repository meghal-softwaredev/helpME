import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Chip, Box, Divider } from '@mui/material';
import { getIndividualFeed } from '../actions/feedActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

function IndividualFeed() {
  const dispatch = useDispatch();
  let feedId = useParams().id;

  const individualFeedDetails = useSelector((state) => state.individualFeedDetails);
  const { loading, error, feed } = individualFeedDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  console.log(individualFeedDetails);

  useEffect(() => {
    dispatch(getIndividualFeed(feedId));
  }, [dispatch, feedId]);

  return (
    <div className="feed-item-container">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
      <Box sx={{ border: 1, my: 2, p: 2 }}>
        <Box sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
          {feed.title}
        </Box>
        {feed.tags.map(tag => (
          <Chip key={tag} sx={{ mr: 1 }} label={tag} color="primary" />
        ))}
        <p>{feed.description}</p>
        <br />
        <Divider light={true}>
          <Chip label="ANSWERS" sx={{ backgroundColor: '#fff' }} />
        </Divider>
              {feed.answers && feed.answers.map(ans => (
                <div key={ans._id}>
                  <p>{ans.answer}</p>
                  <p>{ans.answer}</p>
                </div>

              ))}
        
      </Box>
      )}
    </div>
  );
}

export default IndividualFeed;
