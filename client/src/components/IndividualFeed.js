import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Chip, Box, Divider, Container, Typography, Grid, TextField, Button } from '@mui/material';

import { darkTheme } from "../mui/themes";
import { getIndividualFeed, saveAnswer } from '../actions/feedActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

function IndividualFeed() {

  const [newAnswer, setNewAnswer] = useState("")
  const dispatch = useDispatch();
  let feedId = useParams().id;

  const individualFeedDetails = useSelector((state) => state.individualFeedDetails);
  const { loading, error, feedDetails } = individualFeedDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;


  useEffect(() => {
    dispatch(getIndividualFeed(feedId));
  }, [dispatch, feedId]);

  function handleNewAnswerChange(e) {
    setNewAnswer(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      saveAnswer({feedId, newAnswer})
    );
    setNewAnswer("");
    dispatch(getIndividualFeed(feedId));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="feed-item-container">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Box sx={{ border: 1, my: 2, p: 2 }}>
            <Box sx={{ fontSize: 'h6.fontSize', fontWeight: 'medium', mb: 2 }}>
                  {feedDetails.feed.title}
            </Box>
                {feedDetails.feed.tags.map(tag => (
              <Chip key={tag} sx={{ mr: 1 }} label={tag} color="primary" />
            ))}
                <p>{feedDetails.feed.description}</p>
                <p>Posted by: {feedDetails.feed.user && feedDetails.feed.user.name}</p>
                <p>Posted on: {feedDetails.feed.createdAt}</p>
            <br />
            <Divider light={true}>
              <Chip label="ANSWERS"/>
            </Divider>
                {feedDetails.answers && feedDetails.answers.map(ans => (
              <div key={ans._id}>
                <p>{ans.answer}</p>
              </div>
            ))}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="answer"
                        label="Answer"
                        placeholder="Answer"
                        multiline
                        rows={4}
                        value={newAnswer}
                        onChange={handleNewAnswerChange}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Post Answer
                  </Button>
                </Box>
          </Box>
        )}
      </div>
    </ThemeProvider>
  );
}

export default IndividualFeed;
